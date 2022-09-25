import { apiWriteLog } from "../logger/writeLog";
import { ImageGallery } from "../model/ImageGallery";
import { Product } from "../model/Product";
import { ProductPrice } from "../model/ProductPrice";
import { Specification } from "../model/Specification";
import { SpecificationType } from "../model/SpecificationType";
import { productService } from "../service/product.service";
import { specKeyService } from "../service/speckey.service";
import { specificationTypeService } from "../service/spectype.service";
import { esGetNumber, esIsEmpty } from "../utils/esHelper";
import respFormat from "../utils/response/respFormat";

class ProductMapper {
  async mapProductByJSON(productJson: any): Promise<Product | null> {
    let rtProduct: Product | null = null;
    try {
      console.log("Mapper Start Mapping ....");
      if (productJson !== null && productJson !== undefined) {
        console.log("productJson Have Value ...");
        const exProduct = await productService.getProductByAllyName(
          `${productJson.Brand} ${productJson.Model}`
        );
        if (exProduct !== undefined && exProduct !== null) {
          console.log("product already Exist !!");
          return null;
        }

        const product = new Product();

        product.aliasName = `${productJson.Brand} ${productJson.Model}`;
        product.brand = productJson.Brand;
        product.model = productJson.Model;
        product.title = `${productJson.Brand} ${productJson.Model}`;

        const specs: Specification[] = [];

        const specsNetType = await specificationTypeService.getById(1);

        if (specsNetType !== null && specsNetType !== undefined) {
          const spcTec = await this.mapSpecification(
            productJson,
            specsNetType,
            "Technology",
            1
          );
          if (spcTec !== null) {
            spcTec.product = product;
            specs.push(spcTec);
          }

          const spc2gBrand = await this.mapSpecification(
            productJson,
            specsNetType,
            "2G-bands",
            2
          );
          if (spc2gBrand !== null) {
            spc2gBrand.product = product;
            specs.push(spc2gBrand);
          }

          const spc3gBrand = await this.mapSpecification(
            productJson,
            specsNetType,
            "3G-bands",
            3
          );
          if (spc3gBrand !== null) {
            spc3gBrand.product = product;
            specs.push(spc3gBrand);
          }

          const spc4gBrand = await this.mapSpecification(
            productJson,
            specsNetType,
            "4G-bands",
            4
          );
          if (spc4gBrand !== null) {
            spc4gBrand.product = product;
            specs.push(spc4gBrand);
          }

          const spc5gBrand = await this.mapSpecification(
            productJson,
            specsNetType,
            "5G-bands",
            5
          );
          if (spc5gBrand !== null) {
            spc5gBrand.product = product;
            specs.push(spc5gBrand);
          }

          const spcSpeed = await this.mapSpecification(
            productJson,
            specsNetType,
            "Speed",
            6
          );
          if (spcSpeed !== null) {
            spcSpeed.product = product;
            specs.push(spcSpeed);
          }

          if (productJson["GPRS"] !== null && productJson["GPRS"] !== "") {
            const spcGPRS = await this.mapSpecification(
              productJson,
              specsNetType,
              "GPRS",
              39
            );
            if (spcGPRS !== null) {
              spcGPRS.product = product;
              specs.push(spcGPRS);
            }
          }

          if (productJson["EDGE"] !== null && productJson["EDGE"] !== "") {
            const spcEDGE = await this.mapSpecification(
              productJson,
              specsNetType,
              "EDGE",
              40
            );
            if (spcEDGE !== null) {
              spcEDGE.product = product;
              specs.push(spcEDGE);
            }
          }
        }

        const specsLaunchType = await specificationTypeService.getById(2);
        if (specsLaunchType !== null && specsLaunchType !== undefined) {
          if (
            productJson["Announced"] !== null &&
            productJson["Announced"] !== ""
          ) {
            const spcAnnounced = await this.mapSpecification(
              productJson,
              specsLaunchType,
              "Announced",
              7
            );
            if (spcAnnounced !== null) {
              spcAnnounced.product = product;
              specs.push(spcAnnounced);
            }
          }

          if (productJson["Status"] !== null && productJson["Status"] !== "") {
            const spcStatus = await this.mapSpecification(
              productJson,
              specsLaunchType,
              "Status",
              8
            );
            if (spcStatus !== null) {
              spcStatus.product = product;
              specs.push(spcStatus);
            }
          }
        }

        const specBodyType = await specificationTypeService.getById(3);
        if (specBodyType !== undefined && specBodyType !== null) {
          if (
            productJson["Dimensions"] !== null &&
            productJson["Dimensions"] !== ""
          ) {
            const spcDimensions = await this.mapSpecification(
              productJson,
              specBodyType,
              "Dimensions",
              9
            );
            if (spcDimensions !== null) {
              spcDimensions.product = product;
              specs.push(spcDimensions);
            }
          }

          if (productJson["Weight"] !== null && productJson["Weight"] !== "") {
            const spcSIM = await this.mapSpecification(
              productJson,
              specBodyType,
              "Weight",
              10
            );
            if (spcSIM !== null) {
              spcSIM.product = product;
              specs.push(spcSIM);
            }
          }

          if (productJson["Build"] !== null && productJson["Build"] !== "") {
            const spcBuild = await this.mapSpecification(
              productJson,
              specBodyType,
              "Build",
              11
            );
            if (spcBuild !== null) {
              spcBuild.product = product;
              specs.push(spcBuild);
            }
          }

          if (productJson["SIM"] !== null && productJson["SIM"] !== "") {
            const spcSIM = await this.mapSpecification(
              productJson,
              specBodyType,
              "SIM",
              12
            );
            if (spcSIM !== null) {
              spcSIM.product = product;
              specs.push(spcSIM);
            }
          }
        }

        const specDisplayType = await specificationTypeService.getById(4);

        if (specDisplayType !== undefined && specDisplayType !== null) {
          if (productJson["Type"] !== null && productJson["Type"] !== "") {
            const spcDType = await this.mapSpecification(
              productJson,
              specDisplayType,
              "Type",
              13
            );
            if (spcDType !== null) {
              spcDType.product = product;
              specs.push(spcDType);
            }
          }

          if (productJson["Size"] !== null && productJson["Size"] !== "") {
            const spcSize = await this.mapSpecification(
              productJson,
              specDisplayType,
              "Size",
              14
            );
            if (spcSize !== null) {
              spcSize.product = product;
              specs.push(spcSize);
            }
          }

          if (
            productJson["Resolution"] !== null &&
            productJson["Resolution"] !== ""
          ) {
            const spcResolution = await this.mapSpecification(
              productJson,
              specDisplayType,
              "Resolution",
              15
            );
            if (spcResolution !== null) {
              spcResolution.product = product;
              specs.push(spcResolution);
            }
          }

          if (
            productJson["Multitouch"] !== null &&
            productJson["Multitouch"] !== ""
          ) {
            const spcMultitouch = await this.mapSpecification(
              productJson,
              specDisplayType,
              "Multitouch",
              41
            );
            if (spcMultitouch !== null) {
              spcMultitouch.product = product;
              specs.push(spcMultitouch);
            }
          }

          if (
            productJson["Protection"] !== null &&
            productJson["Protection"] !== ""
          ) {
            const spcProtection = await this.mapSpecification(
              productJson,
              specDisplayType,
              "Protection",
              42
            );
            if (spcProtection !== null) {
              spcProtection.product = product;
              specs.push(spcProtection);
            }
          }

          if (
            productJson["Protection"] !== null &&
            productJson["Protection"] !== ""
          ) {
            const spcProtection = await this.mapSpecification(
              productJson,
              specDisplayType,
              "Protection",
              42
            );
            if (spcProtection !== null) {
              spcProtection.product = product;
              specs.push(spcProtection);
            }
          }
        }

        const specPlatformType = await specificationTypeService.getById(5);

        if (specPlatformType !== undefined && specPlatformType !== null) {
          if (productJson["OS"] !== null && productJson["OS"] !== "") {
            const spcOS = await this.mapSpecification(
              productJson,
              specPlatformType,
              "OS",
              16
            );
            if (spcOS !== null) {
              spcOS.product = product;
              specs.push(spcOS);
            }
          }

          if (
            productJson["Chipset"] !== null &&
            productJson["Chipset"] !== ""
          ) {
            const spcChipset = await this.mapSpecification(
              productJson,
              specPlatformType,
              "Chipset",
              17
            );
            if (spcChipset !== null) {
              spcChipset.product = product;
              specs.push(spcChipset);
            }
          }

          if (productJson["CPU"] !== null && productJson["CPU"] !== "") {
            const spcCPU = await this.mapSpecification(
              productJson,
              specPlatformType,
              "CPU",
              18
            );
            if (spcCPU !== null) {
              spcCPU.product = product;
              specs.push(spcCPU);
            }
          }

          if (productJson["GPU"] !== null && productJson["GPU"] !== "") {
            const spcGPU = await this.mapSpecification(
              productJson,
              specPlatformType,
              "GPU",
              19
            );
            if (spcGPU !== null) {
              spcGPU.product = product;
              specs.push(spcGPU);
            }
          }
        }

        const specMemoryType = await specificationTypeService.getById(6);

        if (specMemoryType !== undefined && specMemoryType !== null) {
          if (
            productJson["Card-slot"] !== null &&
            productJson["Card-slot"] !== ""
          ) {
            const spcCardSlot = await this.mapSpecification(
              productJson,
              specMemoryType,
              "Card-slot",
              20
            );
            if (spcCardSlot !== null) {
              spcCardSlot.product = product;
              specs.push(spcCardSlot);
            }
          }

          if (
            productJson["Internal"] !== null &&
            productJson["Internal"] !== ""
          ) {
            const spcInternal = await this.mapSpecification(
              productJson,
              specMemoryType,
              "Internal",
              21
            );
            if (spcInternal !== null) {
              spcInternal.product = product;
              specs.push(spcInternal);
            }
          }

          if (productJson["RAM"] !== null && productJson["RAM"] !== "") {
            const spcRAM = await this.mapSpecification(
              productJson,
              specMemoryType,
              "RAM",
              43
            );
            if (spcRAM !== null) {
              spcRAM.product = product;
              specs.push(spcRAM);
            }
          }
        }

        const specCameraType = await specificationTypeService.getById(7);

        if (specCameraType !== undefined && specCameraType !== null) {
          if (
            productJson["Primary-camera"] !== null &&
            productJson["Primary-camera"] !== ""
          ) {
            const spcPrimaryCamera = await this.mapSpecification(
              productJson,
              specCameraType,
              "Primary-camera",
              44
            );
            if (spcPrimaryCamera !== null) {
              spcPrimaryCamera.product = product;
              specs.push(spcPrimaryCamera);
            }
          }

          if (
            productJson["Secondary-camera"] !== null &&
            productJson["Secondary-camera"] !== ""
          ) {
            const spcSecondaryCamera = await this.mapSpecification(
              productJson,
              specCameraType,
              "Secondary-camera",
              45
            );
            if (spcSecondaryCamera !== null) {
              spcSecondaryCamera.product = product;
              specs.push(spcSecondaryCamera);
            }
          }

          if (productJson["Video"] !== null && productJson["Video"] !== "") {
            const spcVideo = await this.mapSpecification(
              productJson,
              specCameraType,
              "Video",
              24
            );
            if (spcVideo !== null) {
              spcVideo.product = product;
              specs.push(spcVideo);
            }
          }
        }

        const sepcSoundType = await specificationTypeService.getById(8);
        if (sepcSoundType !== undefined && sepcSoundType !== null) {
          if (
            productJson["Alert-types"] !== null &&
            productJson["Alert-types"] !== ""
          ) {
            const spcAlertTypes = await this.mapSpecification(
              productJson,
              sepcSoundType,
              "Alert-types",
              46
            );
            if (spcAlertTypes !== null) {
              spcAlertTypes.product = product;
              specs.push(spcAlertTypes);
            }
          }

          if (
            productJson["Loudspeaker"] !== null &&
            productJson["Loudspeaker"] !== ""
          ) {
            const spcLoudspeaker = await this.mapSpecification(
              productJson,
              sepcSoundType,
              "Loudspeaker",
              26
            );
            if (spcLoudspeaker !== null) {
              spcLoudspeaker.product = product;
              specs.push(spcLoudspeaker);
            }
          }

          if (
            productJson["3.5mm-jack"] !== null &&
            productJson["3.5mm-jack"] !== ""
          ) {
            const spc3_5mmJack = await this.mapSpecification(
              productJson,
              sepcSoundType,
              "3.5mm-jack",
              27
            );
            if (spc3_5mmJack !== null) {
              spc3_5mmJack.product = product;
              specs.push(spc3_5mmJack);
            }
          }
        }

        const spcConnectivityType = await specificationTypeService.getById(9);

        if (spcConnectivityType !== undefined && spcConnectivityType !== null) {
          if (productJson["WLAN"] !== null && productJson["WLAN"] !== "") {
            const spcWLAN = await this.mapSpecification(
              productJson,
              spcConnectivityType,
              "WLAN",
              28
            );
            if (spcWLAN !== null) {
              spcWLAN.product = product;
              specs.push(spcWLAN);
            }
          }

          if (
            productJson["Bluetooth"] !== null &&
            productJson["Bluetooth"] !== ""
          ) {
            const spcBluetooth = await this.mapSpecification(
              productJson,
              spcConnectivityType,
              "Bluetooth",
              29
            );
            if (spcBluetooth !== null) {
              spcBluetooth.product = product;
              specs.push(spcBluetooth);
            }
          }

          if (productJson["GPS"] !== null && productJson["GPS"] !== "") {
            const spcGPS = await this.mapSpecification(
              productJson,
              spcConnectivityType,
              "GPS",
              30
            );
            if (spcGPS !== null) {
              spcGPS.product = product;
              specs.push(spcGPS);
            }
          }

          if (productJson["NFC"] !== null && productJson["NFC"] !== "") {
            const spcNFC = await this.mapSpecification(
              productJson,
              spcConnectivityType,
              "NFC",
              31
            );
            if (spcNFC !== null) {
              spcNFC.product = product;
              specs.push(spcNFC);
            }
          }

          if (
            productJson["FM-radio"] !== null &&
            productJson["FM-radio"] !== ""
          ) {
            const spcFMRadio = await this.mapSpecification(
              productJson,
              spcConnectivityType,
              "FM-radio",
              32
            );
            if (spcFMRadio !== null) {
              spcFMRadio.product = product;
              specs.push(spcFMRadio);
            }
          }

          if (productJson["USB"] !== null && productJson["USB"] !== "") {
            const spcUSB = await this.mapSpecification(
              productJson,
              spcConnectivityType,
              "USB",
              33
            );
            if (spcUSB !== null) {
              spcUSB.product = product;
              specs.push(spcUSB);
            }
          }

          const spcInfraredPort = await this.mapSpecification(
            productJson,
            spcConnectivityType,
            "Infrared-port",
            47
          );
          if (spcInfraredPort !== null) {
            spcInfraredPort.product = product;
            specs.push(spcInfraredPort);
          }
        }

        const spcFeaturesType = await specificationTypeService.getById(10);

        if (spcFeaturesType !== undefined && spcFeaturesType !== null) {
          if (
            productJson["Sensors"] !== null &&
            productJson["Sensors"] !== ""
          ) {
            const spcSensors = await this.mapSpecification(
              productJson,
              spcFeaturesType,
              "Sensors",
              34
            );
            if (spcSensors !== null) {
              spcSensors.product = product;
              specs.push(spcSensors);
            }
          }

          if (
            productJson["Messaging"] !== null &&
            productJson["Messaging"] !== ""
          ) {
            const spcMessaging = await this.mapSpecification(
              productJson,
              spcFeaturesType,
              "Messaging",
              48
            );
            if (spcMessaging !== null) {
              spcMessaging.product = product;
              specs.push(spcMessaging);
            }
          }

          if (
            productJson["Browser"] !== null &&
            productJson["Browser"] !== ""
          ) {
            const spcBrowser = await this.mapSpecification(
              productJson,
              spcFeaturesType,
              "Browser",
              49
            );
            if (spcBrowser !== null) {
              spcBrowser.product = product;
              specs.push(spcBrowser);
            }
          }

          const spcJava = await this.mapSpecification(
            productJson,
            spcFeaturesType,
            "Java",
            50
          );
          if (spcJava !== null) {
            spcJava.product = product;
            specs.push(spcJava);
          }
        }

        const spcBatteryType = await specificationTypeService.getById(10);

        if (spcBatteryType !== undefined && spcBatteryType !== null) {
          if (
            productJson["Battery-type"] !== null &&
            productJson["Battery-type"] !== ""
          ) {
            const spcBtType = await this.mapSpecification(
              productJson,
              spcBatteryType,
              "Battery-type",
              35
            );
            if (spcBtType !== null) {
              spcBtType.product = product;
              specs.push(spcBtType);
            }
          }

          if (
            productJson["Battery-capacity"] !== null &&
            productJson["Battery-capacity"] !== ""
          ) {
            const spcBtCapType = await this.mapSpecification(
              productJson,
              spcBatteryType,
              "Battery-capacity",
              51
            );
            if (spcBtCapType !== null) {
              spcBtCapType.product = product;
              specs.push(spcBtCapType);
            }
          }

          if (
            productJson["Charging"] !== null &&
            productJson["Charging"] !== ""
          ) {
            const spcBtCharging = await this.mapSpecification(
              productJson,
              spcBatteryType,
              "Charging",
              52
            );
            if (spcBtCharging !== null) {
              spcBtCharging.product = product;
              specs.push(spcBtCharging);
            }
          }
        }

        const spcMoreType = await specificationTypeService.getById(13);
        if (spcMoreType !== undefined && spcMoreType !== null) {
          if (
            productJson["Made-by"] !== null &&
            productJson["Made-by"] !== ""
          ) {
            const spcMade = await this.mapSpecification(
              productJson,
              spcMoreType,
              "Made-by",
              53
            );
            if (spcMade !== null) {
              spcMade.product = product;
              specs.push(spcMade);
            }
          }

          if (productJson["Color"] !== null && productJson["Color"] !== "") {
            const spcColor = await this.mapSpecification(
              productJson,
              spcMoreType,
              "Color",
              36
            );
            if (spcColor !== null) {
              spcColor.product = product;
              specs.push(spcColor);
            }
          }

          if (
            productJson["Other-Features"] !== null &&
            productJson["Other-Features"] !== ""
          ) {
            const spcOtherFeatures = await this.mapSpecification(
              productJson,
              spcMoreType,
              "Charging",
              54
            );
            if (spcOtherFeatures !== null) {
              spcOtherFeatures.product = product;
              specs.push(spcOtherFeatures);
            }
          }
        }

        const images: ImageGallery[] = [];

        if (
          productJson["Image-1-Black"] !== null &&
          productJson["Image-1-Black"] !== ""
        ) {
          const image1 = new ImageGallery();
          image1.altTag = `${productJson.Brand} ${productJson.Model}`;
          image1.name = `${productJson.Brand} ${productJson.Model}`;
          image1.title = `${productJson.Brand} ${productJson.Model}`;
          image1.location = productJson["Image-1-Black"];
          images.push(image1);
        }

        if (
          productJson["Image-2-White"] !== null &&
          productJson["Image-2-White"] !== ""
        ) {
          const image2 = new ImageGallery();
          image2.altTag = `${productJson.Brand} ${productJson.Model}`;
          image2.name = `${productJson.Brand} ${productJson.Model}`;
          image2.title = `${productJson.Brand} ${productJson.Model}`;
          image2.location = productJson["Image-2-White"];
          images.push(image2);
        }
        if (productJson["Image-3"] !== null && productJson["Image-3"] !== "") {
          const image3 = new ImageGallery();
          image3.altTag = `${productJson.Brand} ${productJson.Model}`;
          image3.name = `${productJson.Brand} ${productJson.Model}`;
          image3.title = `${productJson.Brand} ${productJson.Model}`;
          image3.location = productJson["Image-3"];
          images.push(image3);
        }
        if (productJson["Image-4"] !== null && productJson["Image-4"] !== "") {
          const image4 = new ImageGallery();
          image4.altTag = `${productJson.Brand} ${productJson.Model}`;
          image4.name = `${productJson.Brand} ${productJson.Model}`;
          image4.title = `${productJson.Brand} ${productJson.Model}`;
          image4.location = productJson["Image-4"];
          images.push(image4);
        }

        product.prices = this.mapProductPrices(productJson);

        if (product.prices.length === 0) {
          const productPrice = new ProductPrice();
          productPrice.price = esGetNumber(productJson["Price"]);
          productPrice.title = `${productJson["RAM"]} ${productJson["Price"]} TK`;
          productPrice.type = `Official`;

          product.prices.push(productPrice);
        }
        product.specifications = specs;
        product.addAllImage(images);
        rtProduct = product;
      } else {
        console.log("productJson Haven't Value ...");
      }
    } catch (error) {
      apiWriteLog.error("Product Map Error ", error);
      console.log("Product Map Error ", error);
    }
    return rtProduct;
  }

  mapProductPrices(productJson: any): ProductPrice[] {
    const priceList: ProductPrice[] = [];

    if (productJson["16"] !== undefined && productJson["16"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["16"]);
      price16.title = `(16GB) ${productJson["16"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["32"] !== undefined && productJson["32"] !== "") {
      const price32: ProductPrice = new ProductPrice();
      price32.price = esGetNumber(productJson["32"]);
      price32.title = `(32GB) ${productJson["32"]} TK`;
      price32.type = `Official`;
      priceList.push(price32);
    }

    if (productJson["64"] !== undefined && productJson["64"] !== "") {
      const price64: ProductPrice = new ProductPrice();
      price64.price = esGetNumber(productJson["64"]);
      price64.title = `(64GB) ${productJson["64"]} TK`;
      price64.type = `Official`;
      priceList.push(price64);
    }

    if (productJson["128"] !== undefined && productJson["128"] !== "") {
      const price128: ProductPrice = new ProductPrice();
      price128.price = esGetNumber(productJson["128"]);
      price128.title = `(128GB) ${productJson["128"]} TK`;
      price128.type = `Official`;
      priceList.push(price128);
    }

    if (productJson["256"] !== undefined && productJson["256"] !== "") {
      const price256: ProductPrice = new ProductPrice();
      price256.price = esGetNumber(productJson["256"]);
      price256.title = `(256GB) ${productJson["256"]} TK`;
      price256.type = `Official`;
      priceList.push(price256);
    }

    if (productJson["512"] !== undefined && productJson["512"] !== "") {
      const price512: ProductPrice = new ProductPrice();
      price512.price = esGetNumber(productJson["512"]);
      price512.title = `(512GB) ${productJson["512"]} TK`;
      price512.type = `Official`;
      priceList.push(price512);
    }

    if (productJson["1TB"] !== undefined && productJson["1TB"] !== "") {
      const price1TB: ProductPrice = new ProductPrice();
      price1TB.price = esGetNumber(productJson["1TB"]);
      price1TB.title = `(1TBGB) ${productJson["1TB"]} TK`;
      price1TB.type = `Official`;
      priceList.push(price1TB);
    }

    if (productJson["u-16"] !== undefined && productJson["u-16"] !== "") {
      const priceU16: ProductPrice = new ProductPrice();
      priceU16.price = esGetNumber(productJson["u-16"]);
      priceU16.title = `(16GB) ${productJson["u-16"]} TK`;
      priceU16.type = `Unofficial`;
      priceList.push(priceU16);
    }

    if (productJson["u-32"] !== undefined && productJson["u-32"] !== "") {
      const priceU32: ProductPrice = new ProductPrice();
      priceU32.price = esGetNumber(productJson["u-32"]);
      priceU32.title = `(32GB) ${productJson["u-32"]} TK`;
      priceU32.type = `Unofficial`;
      priceList.push(priceU32);
    }

    if (productJson["u-64"] !== undefined && productJson["u-64"] !== "") {
      const priceU64: ProductPrice = new ProductPrice();
      priceU64.price = esGetNumber(productJson["u-64"]);
      priceU64.title = `(64GB) ${productJson["u-64"]} TK`;
      priceU64.type = `Unofficial`;
      priceList.push(priceU64);
    }

    if (productJson["u-128"] !== undefined && productJson["u-128"] !== "") {
      const priceU128: ProductPrice = new ProductPrice();
      priceU128.price = esGetNumber(productJson["u-128"]);
      priceU128.title = `(128GB) ${productJson["u-128"]} TK`;
      priceU128.type = `Unofficial`;
      priceList.push(priceU128);
    }

    if (productJson["u-256"] !== undefined && productJson["u-256"] !== "") {
      const priceU256: ProductPrice = new ProductPrice();
      priceU256.price = esGetNumber(productJson["u-256"]);
      priceU256.title = `(256GB) ${productJson["u-256"]} TK`;
      priceU256.type = `Unofficial`;
      priceList.push(priceU256);
    }

    if (productJson["u-512"] !== undefined && productJson["u-512"] !== "") {
      const priceU512: ProductPrice = new ProductPrice();
      priceU512.price = esGetNumber(productJson["u-512"]);
      priceU512.title = `(512GB) ${productJson["u-512"]} TK`;
      priceU512.type = `Unofficial`;
      priceList.push(priceU512);
    }

    if (productJson["u-1TB"] !== undefined && productJson["u-1TB"] !== "") {
      const priceU1TB: ProductPrice = new ProductPrice();
      priceU1TB.price = esGetNumber(productJson["u-1TB"]);
      priceU1TB.title = `(1TBGB) ${productJson["u-1TB"]} TK`;
      priceU1TB.type = `Unofficial`;
      priceList.push(priceU1TB);
    }

    if (productJson["2/32"] !== undefined && productJson["2/32"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["2/32"]);
      price16.title = `(2/32GB) ${productJson["2/32"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["3/32"] !== undefined && productJson["3/32"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["3/32"]);
      price16.title = `(3/32 GB) ${productJson["3/32"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["4/64"] !== undefined && productJson["4/64"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["4/64"]);
      price16.title = `(4/64 GB) ${productJson["4/64"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["4/128"] !== undefined && productJson["4/128"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["4/128"]);
      price16.title = `(4/128 GB) ${productJson["4/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["6/64"] !== undefined && productJson["6/64"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["6/64"]);
      price16.title = `(6/64 GB) ${productJson["6/64"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["6/128"] !== undefined && productJson["6/128"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["6/128"]);
      price16.title = `(6/128 GB) ${productJson["6/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["6/256"] !== undefined && productJson["6/256"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["6/256"]);
      price16.title = `(6/256 GB) ${productJson["6/256"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["8/128"] !== undefined && productJson["8/128"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["8/128"]);
      price16.title = `(8/128 GB) ${productJson["8/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["8/256"] !== undefined && productJson["8/256"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["8/256"]);
      price16.title = `(8/256 GB) ${productJson["8/256"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["(12GB+128GB)"] !== undefined &&
      productJson["(12GB+128GB)"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["(12GB+128GB)"]);
      price16.title = `(12/128) GB ${productJson["(12GB+128GB)"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["(16GB/256GB"] !== undefined &&
      productJson["(16GB/256GB"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["(16GB/256GB"]);
      price16.title = `(16/256) GB ${productJson["(16GB/256GB"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["(18GB+512GB)"] !== undefined &&
      productJson["(18GB+512GB)"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["(18GB+512GB)"]);
      price16.title = `(18/512) GB ${productJson["(18GB+512GB)"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-2/32"] !== undefined && productJson["u-2/32"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-2/32"]);
      price16.title = `(2/32GB) ${productJson["u-2/32"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-3/32"] !== undefined && productJson["u-3/32"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-3/32"]);
      price16.title = `(3/32 GB) ${productJson["u-3/32"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-4/64"] !== undefined && productJson["u-4/64"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-4/64"]);
      price16.title = `(4/64 GB) ${productJson["u-4/64"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-4/128"] !== undefined && productJson["u-4/128"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-4/128"]);
      price16.title = `(4/128 GB) ${productJson["u-4/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-6/64"] !== undefined && productJson["u-6/64"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-6/64"]);
      price16.title = `(6/64 GB) ${productJson["u-6/64"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-6/128"] !== undefined && productJson["u-6/128"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-6/128"]);
      price16.title = `(6/128 GB) ${productJson["u-6/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-6/256"] !== undefined && productJson["u-6/256"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-6/256"]);
      price16.title = `(6/256 GB) ${productJson["u-6/256"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-8/128"] !== undefined && productJson["u-8/128"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-8/128"]);
      price16.title = `(8/128 GB) ${productJson["u-8/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["u-8/256"] !== undefined && productJson["u-8/256"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-8/256"]);
      price16.title = `(8/256 GB) ${productJson["u-8/256"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["u-12/128"] !== undefined &&
      productJson["u-12/128"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-12/128"]);
      price16.title = `(12/128) GB ${productJson["u-12/128"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["u-12/256"] !== undefined &&
      productJson["u-12/256"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-12/256"]);
      price16.title = `(12/256) GB ${productJson["u-12/256"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["u-12/512"] !== undefined &&
      productJson["u-12/512"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-12/512"]);
      price16.title = `(12/512) GB ${productJson["u-12/512"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["u-12/1TB"] !== undefined &&
      productJson["u-12/1TB"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-12/1TB"]);
      price16.title = `(12GB/1TB) ${productJson["u-12/1TB"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["u-16/512"] !== undefined &&
      productJson["u-16/512"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-16/512"]);
      price16.title = `(16/512) GB ${productJson["u-16/512"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (
      productJson["u-18GB/512"] !== undefined &&
      productJson["u-18GB/512"] !== ""
    ) {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["u-18GB/512"]);
      price16.title = `(18GB/512) GB ${productJson["u-18GB/512"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["1/8"] !== undefined && productJson["1/8"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["1/8"]);
      price16.title = `(1/8) GB ${productJson["1/8"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["1/16"] !== undefined && productJson["1/16"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["1/16"]);
      price16.title = `(1/16) GB ${productJson["1/16"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["2/16"] !== undefined && productJson["2/16"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["2/16"]);
      price16.title = `(2/16) GB ${productJson["2/16"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["3/16"] !== undefined && productJson["3/16"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["3/16"]);
      price16.title = `(3/16) GB ${productJson["3/16"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    if (productJson["4/32"] !== undefined && productJson["4/32"] !== "") {
      const price16: ProductPrice = new ProductPrice();
      price16.price = esGetNumber(productJson["4/32"]);
      price16.title = `(4/32) GB ${productJson["4/32"]} TK`;
      price16.type = `Official`;
      priceList.push(price16);
    }

    return priceList;
  }

  private async mapSpecification(
    productJson: any,
    specType: SpecificationType,
    strKey: string,
    keyId: number
  ) {
    const spec: Specification = new Specification();
    spec.description = productJson[strKey];
    spec.value = productJson[strKey];

    const specTecKey = await specKeyService.getById(keyId);
    if (specTecKey !== undefined && specTecKey !== null) {
      spec.key = specTecKey;
      return spec;
    }

    return null;
  }
}

export const productMapper = new ProductMapper();
