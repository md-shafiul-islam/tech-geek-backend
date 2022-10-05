"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productMapper = void 0;
const writeLog_1 = require("../logger/writeLog");
const ImageGallery_1 = require("../model/ImageGallery");
const Product_1 = require("../model/Product");
const ProductPrice_1 = require("../model/ProductPrice");
const Specification_1 = require("../model/Specification");
const product_service_1 = require("../service/product.service");
const speckey_service_1 = require("../service/speckey.service");
const spectype_service_1 = require("../service/spectype.service");
const esHelper_1 = require("../utils/esHelper");
class ProductMapper {
    async mapProductByJSON(productJson) {
        let rtProduct = null;
        try {
            console.log("Mapper Start Mapping ....");
            if (productJson !== null && productJson !== undefined) {
                console.log("productJson Have Value ...");
                const exProduct = await product_service_1.productService.getProductByAllyName(`${productJson.Brand} ${productJson.Model}`);
                if (exProduct !== undefined && exProduct !== null) {
                    console.log("product already Exist !!");
                    return null;
                }
                const product = new Product_1.Product();
                product.aliasName = `${productJson.Brand} ${productJson.Model}`;
                product.brand = productJson.Brand;
                product.model = productJson.Model;
                product.title = `${productJson.Brand} ${productJson.Model}`;
                const specs = [];
                const specsNetType = await spectype_service_1.specificationTypeService.getById(1);
                if (specsNetType !== null && specsNetType !== undefined) {
                    const spcTec = await this.mapSpecification(productJson, specsNetType, "Technology", 1);
                    if (spcTec !== null) {
                        spcTec.product = product;
                        specs.push(spcTec);
                    }
                    const spc2gBrand = await this.mapSpecification(productJson, specsNetType, "2G-bands", 2);
                    if (spc2gBrand !== null) {
                        spc2gBrand.product = product;
                        specs.push(spc2gBrand);
                    }
                    const spc3gBrand = await this.mapSpecification(productJson, specsNetType, "3G-bands", 3);
                    if (spc3gBrand !== null) {
                        spc3gBrand.product = product;
                        specs.push(spc3gBrand);
                    }
                    const spc4gBrand = await this.mapSpecification(productJson, specsNetType, "4G-bands", 4);
                    if (spc4gBrand !== null) {
                        spc4gBrand.product = product;
                        specs.push(spc4gBrand);
                    }
                    const spc5gBrand = await this.mapSpecification(productJson, specsNetType, "5G-bands", 5);
                    if (spc5gBrand !== null) {
                        spc5gBrand.product = product;
                        specs.push(spc5gBrand);
                    }
                    const spcSpeed = await this.mapSpecification(productJson, specsNetType, "Speed", 6);
                    if (spcSpeed !== null) {
                        spcSpeed.product = product;
                        specs.push(spcSpeed);
                    }
                    if (productJson["GPRS"] !== null && productJson["GPRS"] !== "") {
                        const spcGPRS = await this.mapSpecification(productJson, specsNetType, "GPRS", 39);
                        if (spcGPRS !== null) {
                            spcGPRS.product = product;
                            specs.push(spcGPRS);
                        }
                    }
                    if (productJson["EDGE"] !== null && productJson["EDGE"] !== "") {
                        const spcEDGE = await this.mapSpecification(productJson, specsNetType, "EDGE", 40);
                        if (spcEDGE !== null) {
                            spcEDGE.product = product;
                            specs.push(spcEDGE);
                        }
                    }
                }
                const specsLaunchType = await spectype_service_1.specificationTypeService.getById(2);
                if (specsLaunchType !== null && specsLaunchType !== undefined) {
                    if (productJson["Announced"] !== null &&
                        productJson["Announced"] !== "") {
                        const spcAnnounced = await this.mapSpecification(productJson, specsLaunchType, "Announced", 7);
                        if (spcAnnounced !== null) {
                            spcAnnounced.product = product;
                            specs.push(spcAnnounced);
                        }
                    }
                    if (productJson["Status"] !== null && productJson["Status"] !== "") {
                        const spcStatus = await this.mapSpecification(productJson, specsLaunchType, "Status", 8);
                        if (spcStatus !== null) {
                            spcStatus.product = product;
                            specs.push(spcStatus);
                        }
                    }
                }
                const specBodyType = await spectype_service_1.specificationTypeService.getById(3);
                if (specBodyType !== undefined && specBodyType !== null) {
                    if (productJson["Dimensions"] !== null &&
                        productJson["Dimensions"] !== "") {
                        const spcDimensions = await this.mapSpecification(productJson, specBodyType, "Dimensions", 9);
                        if (spcDimensions !== null) {
                            spcDimensions.product = product;
                            specs.push(spcDimensions);
                        }
                    }
                    if (productJson["Weight"] !== null && productJson["Weight"] !== "") {
                        const spcSIM = await this.mapSpecification(productJson, specBodyType, "Weight", 10);
                        if (spcSIM !== null) {
                            spcSIM.product = product;
                            specs.push(spcSIM);
                        }
                    }
                    if (productJson["Build"] !== null && productJson["Build"] !== "") {
                        const spcBuild = await this.mapSpecification(productJson, specBodyType, "Build", 11);
                        if (spcBuild !== null) {
                            spcBuild.product = product;
                            specs.push(spcBuild);
                        }
                    }
                    if (productJson["SIM"] !== null && productJson["SIM"] !== "") {
                        const spcSIM = await this.mapSpecification(productJson, specBodyType, "SIM", 12);
                        if (spcSIM !== null) {
                            spcSIM.product = product;
                            specs.push(spcSIM);
                        }
                    }
                }
                const specDisplayType = await spectype_service_1.specificationTypeService.getById(4);
                if (specDisplayType !== undefined && specDisplayType !== null) {
                    if (productJson["Type"] !== null && productJson["Type"] !== "") {
                        const spcDType = await this.mapSpecification(productJson, specDisplayType, "Type", 13);
                        if (spcDType !== null) {
                            spcDType.product = product;
                            specs.push(spcDType);
                        }
                    }
                    if (productJson["Size"] !== null && productJson["Size"] !== "") {
                        const spcSize = await this.mapSpecification(productJson, specDisplayType, "Size", 14);
                        if (spcSize !== null) {
                            spcSize.product = product;
                            specs.push(spcSize);
                        }
                    }
                    if (productJson["Resolution"] !== null &&
                        productJson["Resolution"] !== "") {
                        const spcResolution = await this.mapSpecification(productJson, specDisplayType, "Resolution", 15);
                        if (spcResolution !== null) {
                            spcResolution.product = product;
                            specs.push(spcResolution);
                        }
                    }
                    if (productJson["Multitouch"] !== null &&
                        productJson["Multitouch"] !== "") {
                        const spcMultitouch = await this.mapSpecification(productJson, specDisplayType, "Multitouch", 41);
                        if (spcMultitouch !== null) {
                            spcMultitouch.product = product;
                            specs.push(spcMultitouch);
                        }
                    }
                    if (productJson["Protection"] !== null &&
                        productJson["Protection"] !== "") {
                        const spcProtection = await this.mapSpecification(productJson, specDisplayType, "Protection", 42);
                        if (spcProtection !== null) {
                            spcProtection.product = product;
                            specs.push(spcProtection);
                        }
                    }
                    if (productJson["Protection"] !== null &&
                        productJson["Protection"] !== "") {
                        const spcProtection = await this.mapSpecification(productJson, specDisplayType, "Protection", 42);
                        if (spcProtection !== null) {
                            spcProtection.product = product;
                            specs.push(spcProtection);
                        }
                    }
                }
                const specPlatformType = await spectype_service_1.specificationTypeService.getById(5);
                if (specPlatformType !== undefined && specPlatformType !== null) {
                    if (productJson["OS"] !== null && productJson["OS"] !== "") {
                        const spcOS = await this.mapSpecification(productJson, specPlatformType, "OS", 16);
                        if (spcOS !== null) {
                            spcOS.product = product;
                            specs.push(spcOS);
                        }
                    }
                    if (productJson["Chipset"] !== null &&
                        productJson["Chipset"] !== "") {
                        const spcChipset = await this.mapSpecification(productJson, specPlatformType, "Chipset", 17);
                        if (spcChipset !== null) {
                            spcChipset.product = product;
                            specs.push(spcChipset);
                        }
                    }
                    if (productJson["CPU"] !== null && productJson["CPU"] !== "") {
                        const spcCPU = await this.mapSpecification(productJson, specPlatformType, "CPU", 18);
                        if (spcCPU !== null) {
                            spcCPU.product = product;
                            specs.push(spcCPU);
                        }
                    }
                    if (productJson["GPU"] !== null && productJson["GPU"] !== "") {
                        const spcGPU = await this.mapSpecification(productJson, specPlatformType, "GPU", 19);
                        if (spcGPU !== null) {
                            spcGPU.product = product;
                            specs.push(spcGPU);
                        }
                    }
                }
                const specMemoryType = await spectype_service_1.specificationTypeService.getById(6);
                if (specMemoryType !== undefined && specMemoryType !== null) {
                    if (productJson["Card-slot"] !== null &&
                        productJson["Card-slot"] !== "") {
                        const spcCardSlot = await this.mapSpecification(productJson, specMemoryType, "Card-slot", 20);
                        if (spcCardSlot !== null) {
                            spcCardSlot.product = product;
                            specs.push(spcCardSlot);
                        }
                    }
                    if (productJson["Internal"] !== null &&
                        productJson["Internal"] !== "") {
                        const spcInternal = await this.mapSpecification(productJson, specMemoryType, "Internal", 21);
                        if (spcInternal !== null) {
                            spcInternal.product = product;
                            specs.push(spcInternal);
                        }
                    }
                    if (productJson["RAM"] !== null && productJson["RAM"] !== "") {
                        const spcRAM = await this.mapSpecification(productJson, specMemoryType, "RAM", 43);
                        if (spcRAM !== null) {
                            spcRAM.product = product;
                            specs.push(spcRAM);
                        }
                    }
                }
                const specCameraType = await spectype_service_1.specificationTypeService.getById(7);
                if (specCameraType !== undefined && specCameraType !== null) {
                    if (productJson["Primary-camera"] !== null &&
                        productJson["Primary-camera"] !== "") {
                        const spcPrimaryCamera = await this.mapSpecification(productJson, specCameraType, "Primary-camera", 44);
                        if (spcPrimaryCamera !== null) {
                            spcPrimaryCamera.product = product;
                            specs.push(spcPrimaryCamera);
                        }
                    }
                    if (productJson["Secondary-camera"] !== null &&
                        productJson["Secondary-camera"] !== "") {
                        const spcSecondaryCamera = await this.mapSpecification(productJson, specCameraType, "Secondary-camera", 45);
                        if (spcSecondaryCamera !== null) {
                            spcSecondaryCamera.product = product;
                            specs.push(spcSecondaryCamera);
                        }
                    }
                    if (productJson["Video"] !== null && productJson["Video"] !== "") {
                        const spcVideo = await this.mapSpecification(productJson, specCameraType, "Video", 24);
                        if (spcVideo !== null) {
                            spcVideo.product = product;
                            specs.push(spcVideo);
                        }
                    }
                }
                const sepcSoundType = await spectype_service_1.specificationTypeService.getById(8);
                if (sepcSoundType !== undefined && sepcSoundType !== null) {
                    if (productJson["Alert-types"] !== null &&
                        productJson["Alert-types"] !== "") {
                        const spcAlertTypes = await this.mapSpecification(productJson, sepcSoundType, "Alert-types", 46);
                        if (spcAlertTypes !== null) {
                            spcAlertTypes.product = product;
                            specs.push(spcAlertTypes);
                        }
                    }
                    if (productJson["Loudspeaker"] !== null &&
                        productJson["Loudspeaker"] !== "") {
                        const spcLoudspeaker = await this.mapSpecification(productJson, sepcSoundType, "Loudspeaker", 26);
                        if (spcLoudspeaker !== null) {
                            spcLoudspeaker.product = product;
                            specs.push(spcLoudspeaker);
                        }
                    }
                    if (productJson["3.5mm-jack"] !== null &&
                        productJson["3.5mm-jack"] !== "") {
                        const spc3_5mmJack = await this.mapSpecification(productJson, sepcSoundType, "3.5mm-jack", 27);
                        if (spc3_5mmJack !== null) {
                            spc3_5mmJack.product = product;
                            specs.push(spc3_5mmJack);
                        }
                    }
                }
                const spcConnectivityType = await spectype_service_1.specificationTypeService.getById(9);
                if (spcConnectivityType !== undefined && spcConnectivityType !== null) {
                    if (productJson["WLAN"] !== null && productJson["WLAN"] !== "") {
                        const spcWLAN = await this.mapSpecification(productJson, spcConnectivityType, "WLAN", 28);
                        if (spcWLAN !== null) {
                            spcWLAN.product = product;
                            specs.push(spcWLAN);
                        }
                    }
                    if (productJson["Bluetooth"] !== null &&
                        productJson["Bluetooth"] !== "") {
                        const spcBluetooth = await this.mapSpecification(productJson, spcConnectivityType, "Bluetooth", 29);
                        if (spcBluetooth !== null) {
                            spcBluetooth.product = product;
                            specs.push(spcBluetooth);
                        }
                    }
                    if (productJson["GPS"] !== null && productJson["GPS"] !== "") {
                        const spcGPS = await this.mapSpecification(productJson, spcConnectivityType, "GPS", 30);
                        if (spcGPS !== null) {
                            spcGPS.product = product;
                            specs.push(spcGPS);
                        }
                    }
                    if (productJson["NFC"] !== null && productJson["NFC"] !== "") {
                        const spcNFC = await this.mapSpecification(productJson, spcConnectivityType, "NFC", 31);
                        if (spcNFC !== null) {
                            spcNFC.product = product;
                            specs.push(spcNFC);
                        }
                    }
                    if (productJson["FM-radio"] !== null &&
                        productJson["FM-radio"] !== "") {
                        const spcFMRadio = await this.mapSpecification(productJson, spcConnectivityType, "FM-radio", 32);
                        if (spcFMRadio !== null) {
                            spcFMRadio.product = product;
                            specs.push(spcFMRadio);
                        }
                    }
                    if (productJson["USB"] !== null && productJson["USB"] !== "") {
                        const spcUSB = await this.mapSpecification(productJson, spcConnectivityType, "USB", 33);
                        if (spcUSB !== null) {
                            spcUSB.product = product;
                            specs.push(spcUSB);
                        }
                    }
                    const spcInfraredPort = await this.mapSpecification(productJson, spcConnectivityType, "Infrared-port", 47);
                    if (spcInfraredPort !== null) {
                        spcInfraredPort.product = product;
                        specs.push(spcInfraredPort);
                    }
                }
                const spcFeaturesType = await spectype_service_1.specificationTypeService.getById(10);
                if (spcFeaturesType !== undefined && spcFeaturesType !== null) {
                    if (productJson["Sensors"] !== null &&
                        productJson["Sensors"] !== "") {
                        const spcSensors = await this.mapSpecification(productJson, spcFeaturesType, "Sensors", 34);
                        if (spcSensors !== null) {
                            spcSensors.product = product;
                            specs.push(spcSensors);
                        }
                    }
                    if (productJson["Messaging"] !== null &&
                        productJson["Messaging"] !== "") {
                        const spcMessaging = await this.mapSpecification(productJson, spcFeaturesType, "Messaging", 48);
                        if (spcMessaging !== null) {
                            spcMessaging.product = product;
                            specs.push(spcMessaging);
                        }
                    }
                    if (productJson["Browser"] !== null &&
                        productJson["Browser"] !== "") {
                        const spcBrowser = await this.mapSpecification(productJson, spcFeaturesType, "Browser", 49);
                        if (spcBrowser !== null) {
                            spcBrowser.product = product;
                            specs.push(spcBrowser);
                        }
                    }
                    const spcJava = await this.mapSpecification(productJson, spcFeaturesType, "Java", 50);
                    if (spcJava !== null) {
                        spcJava.product = product;
                        specs.push(spcJava);
                    }
                }
                const spcBatteryType = await spectype_service_1.specificationTypeService.getById(10);
                if (spcBatteryType !== undefined && spcBatteryType !== null) {
                    if (productJson["Battery-type"] !== null &&
                        productJson["Battery-type"] !== "") {
                        const spcBtType = await this.mapSpecification(productJson, spcBatteryType, "Battery-type", 35);
                        if (spcBtType !== null) {
                            spcBtType.product = product;
                            specs.push(spcBtType);
                        }
                    }
                    if (productJson["Battery-capacity"] !== null &&
                        productJson["Battery-capacity"] !== "") {
                        const spcBtCapType = await this.mapSpecification(productJson, spcBatteryType, "Battery-capacity", 51);
                        if (spcBtCapType !== null) {
                            spcBtCapType.product = product;
                            specs.push(spcBtCapType);
                        }
                    }
                    if (productJson["Charging"] !== null &&
                        productJson["Charging"] !== "") {
                        const spcBtCharging = await this.mapSpecification(productJson, spcBatteryType, "Charging", 52);
                        if (spcBtCharging !== null) {
                            spcBtCharging.product = product;
                            specs.push(spcBtCharging);
                        }
                    }
                }
                const spcMoreType = await spectype_service_1.specificationTypeService.getById(13);
                if (spcMoreType !== undefined && spcMoreType !== null) {
                    if (productJson["Made-by"] !== null &&
                        productJson["Made-by"] !== "") {
                        const spcMade = await this.mapSpecification(productJson, spcMoreType, "Made-by", 53);
                        if (spcMade !== null) {
                            spcMade.product = product;
                            specs.push(spcMade);
                        }
                    }
                    if (productJson["Color"] !== null && productJson["Color"] !== "") {
                        const spcColor = await this.mapSpecification(productJson, spcMoreType, "Color", 36);
                        if (spcColor !== null) {
                            spcColor.product = product;
                            specs.push(spcColor);
                        }
                    }
                    if (productJson["Other-Features"] !== null &&
                        productJson["Other-Features"] !== "") {
                        const spcOtherFeatures = await this.mapSpecification(productJson, spcMoreType, "Charging", 54);
                        if (spcOtherFeatures !== null) {
                            spcOtherFeatures.product = product;
                            specs.push(spcOtherFeatures);
                        }
                    }
                }
                const images = [];
                if (productJson["Image-1-Black"] !== null &&
                    productJson["Image-1-Black"] !== "") {
                    const image1 = new ImageGallery_1.ImageGallery();
                    image1.altTag = `${productJson.Brand} ${productJson.Model}`;
                    image1.name = `${productJson.Brand} ${productJson.Model}`;
                    image1.title = `${productJson.Brand} ${productJson.Model}`;
                    image1.location = productJson["Image-1-Black"];
                    images.push(image1);
                }
                if (productJson["Image-2-White"] !== null &&
                    productJson["Image-2-White"] !== "") {
                    const image2 = new ImageGallery_1.ImageGallery();
                    image2.altTag = `${productJson.Brand} ${productJson.Model}`;
                    image2.name = `${productJson.Brand} ${productJson.Model}`;
                    image2.title = `${productJson.Brand} ${productJson.Model}`;
                    image2.location = productJson["Image-2-White"];
                    images.push(image2);
                }
                if (productJson["Image-3"] !== null && productJson["Image-3"] !== "") {
                    const image3 = new ImageGallery_1.ImageGallery();
                    image3.altTag = `${productJson.Brand} ${productJson.Model}`;
                    image3.name = `${productJson.Brand} ${productJson.Model}`;
                    image3.title = `${productJson.Brand} ${productJson.Model}`;
                    image3.location = productJson["Image-3"];
                    images.push(image3);
                }
                if (productJson["Image-4"] !== null && productJson["Image-4"] !== "") {
                    const image4 = new ImageGallery_1.ImageGallery();
                    image4.altTag = `${productJson.Brand} ${productJson.Model}`;
                    image4.name = `${productJson.Brand} ${productJson.Model}`;
                    image4.title = `${productJson.Brand} ${productJson.Model}`;
                    image4.location = productJson["Image-4"];
                    images.push(image4);
                }
                product.prices = this.mapProductPrices(productJson);
                if (product.prices.length === 0) {
                    const productPrice = new ProductPrice_1.ProductPrice();
                    productPrice.price = (0, esHelper_1.esGetNumber)(productJson["Price"]);
                    productPrice.title = `${productJson["RAM"]} ${productJson["Price"]} TK`;
                    productPrice.type = `Official`;
                    product.prices.push(productPrice);
                }
                product.specifications = specs;
                product.addAllImage(images);
                rtProduct = product;
            }
            else {
                console.log("productJson Haven't Value ...");
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product Map Error ", error);
            console.log("Product Map Error ", error);
        }
        return rtProduct;
    }
    mapProductPrices(productJson) {
        const priceList = [];
        if (productJson["16"] !== undefined && productJson["16"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["16"]);
            price16.title = `(16GB) ${productJson["16"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["32"] !== undefined && productJson["32"] !== "") {
            const price32 = new ProductPrice_1.ProductPrice();
            price32.price = (0, esHelper_1.esGetNumber)(productJson["32"]);
            price32.title = `(32GB) ${productJson["32"]} TK`;
            price32.type = `Official`;
            priceList.push(price32);
        }
        if (productJson["64"] !== undefined && productJson["64"] !== "") {
            const price64 = new ProductPrice_1.ProductPrice();
            price64.price = (0, esHelper_1.esGetNumber)(productJson["64"]);
            price64.title = `(64GB) ${productJson["64"]} TK`;
            price64.type = `Official`;
            priceList.push(price64);
        }
        if (productJson["128"] !== undefined && productJson["128"] !== "") {
            const price128 = new ProductPrice_1.ProductPrice();
            price128.price = (0, esHelper_1.esGetNumber)(productJson["128"]);
            price128.title = `(128GB) ${productJson["128"]} TK`;
            price128.type = `Official`;
            priceList.push(price128);
        }
        if (productJson["256"] !== undefined && productJson["256"] !== "") {
            const price256 = new ProductPrice_1.ProductPrice();
            price256.price = (0, esHelper_1.esGetNumber)(productJson["256"]);
            price256.title = `(256GB) ${productJson["256"]} TK`;
            price256.type = `Official`;
            priceList.push(price256);
        }
        if (productJson["512"] !== undefined && productJson["512"] !== "") {
            const price512 = new ProductPrice_1.ProductPrice();
            price512.price = (0, esHelper_1.esGetNumber)(productJson["512"]);
            price512.title = `(512GB) ${productJson["512"]} TK`;
            price512.type = `Official`;
            priceList.push(price512);
        }
        if (productJson["1TB"] !== undefined && productJson["1TB"] !== "") {
            const price1TB = new ProductPrice_1.ProductPrice();
            price1TB.price = (0, esHelper_1.esGetNumber)(productJson["1TB"]);
            price1TB.title = `(1TBGB) ${productJson["1TB"]} TK`;
            price1TB.type = `Official`;
            priceList.push(price1TB);
        }
        if (productJson["u-16"] !== undefined && productJson["u-16"] !== "") {
            const priceU16 = new ProductPrice_1.ProductPrice();
            priceU16.price = (0, esHelper_1.esGetNumber)(productJson["u-16"]);
            priceU16.title = `(16GB) ${productJson["u-16"]} TK`;
            priceU16.type = `Unofficial`;
            priceList.push(priceU16);
        }
        if (productJson["u-32"] !== undefined && productJson["u-32"] !== "") {
            const priceU32 = new ProductPrice_1.ProductPrice();
            priceU32.price = (0, esHelper_1.esGetNumber)(productJson["u-32"]);
            priceU32.title = `(32GB) ${productJson["u-32"]} TK`;
            priceU32.type = `Unofficial`;
            priceList.push(priceU32);
        }
        if (productJson["u-64"] !== undefined && productJson["u-64"] !== "") {
            const priceU64 = new ProductPrice_1.ProductPrice();
            priceU64.price = (0, esHelper_1.esGetNumber)(productJson["u-64"]);
            priceU64.title = `(64GB) ${productJson["u-64"]} TK`;
            priceU64.type = `Unofficial`;
            priceList.push(priceU64);
        }
        if (productJson["u-128"] !== undefined && productJson["u-128"] !== "") {
            const priceU128 = new ProductPrice_1.ProductPrice();
            priceU128.price = (0, esHelper_1.esGetNumber)(productJson["u-128"]);
            priceU128.title = `(128GB) ${productJson["u-128"]} TK`;
            priceU128.type = `Unofficial`;
            priceList.push(priceU128);
        }
        if (productJson["u-256"] !== undefined && productJson["u-256"] !== "") {
            const priceU256 = new ProductPrice_1.ProductPrice();
            priceU256.price = (0, esHelper_1.esGetNumber)(productJson["u-256"]);
            priceU256.title = `(256GB) ${productJson["u-256"]} TK`;
            priceU256.type = `Unofficial`;
            priceList.push(priceU256);
        }
        if (productJson["u-512"] !== undefined && productJson["u-512"] !== "") {
            const priceU512 = new ProductPrice_1.ProductPrice();
            priceU512.price = (0, esHelper_1.esGetNumber)(productJson["u-512"]);
            priceU512.title = `(512GB) ${productJson["u-512"]} TK`;
            priceU512.type = `Unofficial`;
            priceList.push(priceU512);
        }
        if (productJson["u-1TB"] !== undefined && productJson["u-1TB"] !== "") {
            const priceU1TB = new ProductPrice_1.ProductPrice();
            priceU1TB.price = (0, esHelper_1.esGetNumber)(productJson["u-1TB"]);
            priceU1TB.title = `(1TBGB) ${productJson["u-1TB"]} TK`;
            priceU1TB.type = `Unofficial`;
            priceList.push(priceU1TB);
        }
        if (productJson["2/32"] !== undefined && productJson["2/32"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["2/32"]);
            price16.title = `(2/32GB) ${productJson["2/32"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["3/32"] !== undefined && productJson["3/32"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["3/32"]);
            price16.title = `(3/32 GB) ${productJson["3/32"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["4/64"] !== undefined && productJson["4/64"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["4/64"]);
            price16.title = `(4/64 GB) ${productJson["4/64"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["4/128"] !== undefined && productJson["4/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["4/128"]);
            price16.title = `(4/128 GB) ${productJson["4/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["6/64"] !== undefined && productJson["6/64"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["6/64"]);
            price16.title = `(6/64 GB) ${productJson["6/64"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["6/128"] !== undefined && productJson["6/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["6/128"]);
            price16.title = `(6/128 GB) ${productJson["6/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["6/256"] !== undefined && productJson["6/256"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["6/256"]);
            price16.title = `(6/256 GB) ${productJson["6/256"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["8/128"] !== undefined && productJson["8/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["8/128"]);
            price16.title = `(8/128 GB) ${productJson["8/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["8/256"] !== undefined && productJson["8/256"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["8/256"]);
            price16.title = `(8/256 GB) ${productJson["8/256"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["(12GB+128GB)"] !== undefined &&
            productJson["(12GB+128GB)"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["(12GB+128GB)"]);
            price16.title = `(12/128) GB ${productJson["(12GB+128GB)"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["(16GB/256GB"] !== undefined &&
            productJson["(16GB/256GB"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["(16GB/256GB"]);
            price16.title = `(16/256) GB ${productJson["(16GB/256GB"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["(18GB+512GB)"] !== undefined &&
            productJson["(18GB+512GB)"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["(18GB+512GB)"]);
            price16.title = `(18/512) GB ${productJson["(18GB+512GB)"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-2/32"] !== undefined && productJson["u-2/32"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-2/32"]);
            price16.title = `(2/32GB) ${productJson["u-2/32"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-3/32"] !== undefined && productJson["u-3/32"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-3/32"]);
            price16.title = `(3/32 GB) ${productJson["u-3/32"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-4/64"] !== undefined && productJson["u-4/64"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-4/64"]);
            price16.title = `(4/64 GB) ${productJson["u-4/64"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-4/128"] !== undefined && productJson["u-4/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-4/128"]);
            price16.title = `(4/128 GB) ${productJson["u-4/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-6/64"] !== undefined && productJson["u-6/64"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-6/64"]);
            price16.title = `(6/64 GB) ${productJson["u-6/64"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-6/128"] !== undefined && productJson["u-6/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-6/128"]);
            price16.title = `(6/128 GB) ${productJson["u-6/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-6/256"] !== undefined && productJson["u-6/256"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-6/256"]);
            price16.title = `(6/256 GB) ${productJson["u-6/256"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-8/128"] !== undefined && productJson["u-8/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-8/128"]);
            price16.title = `(8/128 GB) ${productJson["u-8/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-8/256"] !== undefined && productJson["u-8/256"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-8/256"]);
            price16.title = `(8/256 GB) ${productJson["u-8/256"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-12/128"] !== undefined &&
            productJson["u-12/128"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-12/128"]);
            price16.title = `(12/128) GB ${productJson["u-12/128"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-12/256"] !== undefined &&
            productJson["u-12/256"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-12/256"]);
            price16.title = `(12/256) GB ${productJson["u-12/256"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-12/512"] !== undefined &&
            productJson["u-12/512"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-12/512"]);
            price16.title = `(12/512) GB ${productJson["u-12/512"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-12/1TB"] !== undefined &&
            productJson["u-12/1TB"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-12/1TB"]);
            price16.title = `(12GB/1TB) ${productJson["u-12/1TB"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-16/512"] !== undefined &&
            productJson["u-16/512"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-16/512"]);
            price16.title = `(16/512) GB ${productJson["u-16/512"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["u-18GB/512"] !== undefined &&
            productJson["u-18GB/512"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["u-18GB/512"]);
            price16.title = `(18GB/512) GB ${productJson["u-18GB/512"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["1/8"] !== undefined && productJson["1/8"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["1/8"]);
            price16.title = `(1/8) GB ${productJson["1/8"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["1/16"] !== undefined && productJson["1/16"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["1/16"]);
            price16.title = `(1/16) GB ${productJson["1/16"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["2/16"] !== undefined && productJson["2/16"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["2/16"]);
            price16.title = `(2/16) GB ${productJson["2/16"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["3/16"] !== undefined && productJson["3/16"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["3/16"]);
            price16.title = `(3/16) GB ${productJson["3/16"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        if (productJson["4/32"] !== undefined && productJson["4/32"] !== "") {
            const price16 = new ProductPrice_1.ProductPrice();
            price16.price = (0, esHelper_1.esGetNumber)(productJson["4/32"]);
            price16.title = `(4/32) GB ${productJson["4/32"]} TK`;
            price16.type = `Official`;
            priceList.push(price16);
        }
        return priceList;
    }
    async mapSpecification(productJson, specType, strKey, keyId) {
        const spec = new Specification_1.Specification();
        spec.description = productJson[strKey];
        spec.value = productJson[strKey];
        const specTecKey = await speckey_service_1.specKeyService.getById(keyId);
        if (specTecKey !== undefined && specTecKey !== null) {
            spec.key = specTecKey;
            return spec;
        }
        return null;
    }
}
exports.productMapper = new ProductMapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5tYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFwcGVyL3Byb2R1Y3QubWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQUFpRDtBQUNqRCx3REFBcUQ7QUFDckQsOENBQTJDO0FBQzNDLHdEQUFxRDtBQUNyRCwwREFBdUQ7QUFFdkQsZ0VBQTREO0FBQzVELGdFQUE0RDtBQUM1RCxrRUFBdUU7QUFDdkUsZ0RBQTJEO0FBRzNELE1BQU0sYUFBYTtJQUNqQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBZ0I7UUFDckMsSUFBSSxTQUFTLEdBQW1CLElBQUksQ0FBQztRQUNyQyxJQUFJO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pDLElBQUksV0FBVyxLQUFLLElBQUksSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQzFDLE1BQU0sU0FBUyxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxvQkFBb0IsQ0FDekQsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FDNUMsQ0FBQztnQkFDRixJQUFJLFNBQVMsS0FBSyxTQUFTLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztnQkFFOUIsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoRSxPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUU1RCxNQUFNLEtBQUssR0FBb0IsRUFBRSxDQUFDO2dCQUVsQyxNQUFNLFlBQVksR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0QsSUFBSSxZQUFZLEtBQUssSUFBSSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7b0JBQ3ZELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN4QyxXQUFXLEVBQ1gsWUFBWSxFQUNaLFlBQVksRUFDWixDQUFDLENBQ0YsQ0FBQztvQkFDRixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7d0JBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNwQjtvQkFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDNUMsV0FBVyxFQUNYLFlBQVksRUFDWixVQUFVLEVBQ1YsQ0FBQyxDQUNGLENBQUM7b0JBQ0YsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO3dCQUN2QixVQUFVLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDeEI7b0JBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzVDLFdBQVcsRUFDWCxZQUFZLEVBQ1osVUFBVSxFQUNWLENBQUMsQ0FDRixDQUFDO29CQUNGLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTt3QkFDdkIsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7d0JBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3hCO29CQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUM1QyxXQUFXLEVBQ1gsWUFBWSxFQUNaLFVBQVUsRUFDVixDQUFDLENBQ0YsQ0FBQztvQkFDRixJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7d0JBQ3ZCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUN4QjtvQkFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDNUMsV0FBVyxFQUNYLFlBQVksRUFDWixVQUFVLEVBQ1YsQ0FBQyxDQUNGLENBQUM7b0JBQ0YsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO3dCQUN2QixVQUFVLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDeEI7b0JBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzFDLFdBQVcsRUFDWCxZQUFZLEVBQ1osT0FBTyxFQUNQLENBQUMsQ0FDRixDQUFDO29CQUNGLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTt3QkFDckIsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7d0JBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3RCO29CQUVELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUM5RCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDekMsV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFOzRCQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDckI7cUJBQ0Y7b0JBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzlELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN6QyxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7NEJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNyQjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxlQUFlLEtBQUssSUFBSSxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7b0JBQzdELElBQ0UsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUk7d0JBQ2pDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQy9CO3dCQUNBLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUM5QyxXQUFXLEVBQ1gsZUFBZSxFQUNmLFdBQVcsRUFDWCxDQUFDLENBQ0YsQ0FBQzt3QkFDRixJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7NEJBQ3pCLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3lCQUMxQjtxQkFDRjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDbEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzNDLFdBQVcsRUFDWCxlQUFlLEVBQ2YsUUFBUSxFQUNSLENBQUMsQ0FDRixDQUFDO3dCQUNGLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTs0QkFDdEIsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ3ZCO3FCQUNGO2lCQUNGO2dCQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sMkNBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtvQkFDdkQsSUFDRSxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSTt3QkFDbEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFDaEM7d0JBQ0EsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQy9DLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLENBQUMsQ0FDRixDQUFDO3dCQUNGLElBQUksYUFBYSxLQUFLLElBQUksRUFBRTs0QkFDMUIsYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7eUJBQzNCO3FCQUNGO29CQUVELElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNsRSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDeEMsV0FBVyxFQUNYLFlBQVksRUFDWixRQUFRLEVBQ1IsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFOzRCQUNuQixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDcEI7cUJBQ0Y7b0JBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ2hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMxQyxXQUFXLEVBQ1gsWUFBWSxFQUNaLE9BQU8sRUFDUCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7NEJBQ3JCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN0QjtxQkFDRjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3hDLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUNMLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTs0QkFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3BCO3FCQUNGO2lCQUNGO2dCQUVELE1BQU0sZUFBZSxHQUFHLE1BQU0sMkNBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLGVBQWUsS0FBSyxTQUFTLElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtvQkFDN0QsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzlELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMxQyxXQUFXLEVBQ1gsZUFBZSxFQUNmLE1BQU0sRUFDTixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7NEJBQ3JCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN0QjtxQkFDRjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDOUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3pDLFdBQVcsRUFDWCxlQUFlLEVBQ2YsTUFBTSxFQUNOLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTs0QkFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3JCO3FCQUNGO29CQUVELElBQ0UsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUk7d0JBQ2xDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQ2hDO3dCQUNBLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMvQyxXQUFXLEVBQ1gsZUFBZSxFQUNmLFlBQVksRUFDWixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7NEJBQzFCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUMzQjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJO3dCQUNsQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUNoQzt3QkFDQSxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDL0MsV0FBVyxFQUNYLGVBQWUsRUFDZixZQUFZLEVBQ1osRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFOzRCQUMxQixhQUFhLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDM0I7cUJBQ0Y7b0JBRUQsSUFDRSxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSTt3QkFDbEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFDaEM7d0JBQ0EsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQy9DLFdBQVcsRUFDWCxlQUFlLEVBQ2YsWUFBWSxFQUNaLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksYUFBYSxLQUFLLElBQUksRUFBRTs0QkFDMUIsYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7eUJBQzNCO3FCQUNGO29CQUVELElBQ0UsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUk7d0JBQ2xDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQ2hDO3dCQUNBLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMvQyxXQUFXLEVBQ1gsZUFBZSxFQUNmLFlBQVksRUFDWixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7NEJBQzFCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUMzQjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sMkNBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVuRSxJQUFJLGdCQUFnQixLQUFLLFNBQVMsSUFBSSxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7b0JBQy9ELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUMxRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDdkMsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixJQUFJLEVBQ0osRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFOzRCQUNsQixLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDbkI7cUJBQ0Y7b0JBRUQsSUFDRSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSTt3QkFDL0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFDN0I7d0JBQ0EsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzVDLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTs0QkFDdkIsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ3hCO3FCQUNGO29CQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUM1RCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDeEMsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixLQUFLLEVBQ0wsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFOzRCQUNuQixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDcEI7cUJBQ0Y7b0JBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN4QyxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNwQjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakUsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7b0JBQzNELElBQ0UsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUk7d0JBQ2pDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQy9CO3dCQUNBLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUM3QyxXQUFXLEVBQ1gsY0FBYyxFQUNkLFdBQVcsRUFDWCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7NEJBQ3hCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUN6QjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJO3dCQUNoQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUM5Qjt3QkFDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDN0MsV0FBVyxFQUNYLGNBQWMsRUFDZCxVQUFVLEVBQ1YsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFOzRCQUN4QixXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt5QkFDekI7cUJBQ0Y7b0JBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN4QyxXQUFXLEVBQ1gsY0FBYyxFQUNkLEtBQUssRUFDTCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNwQjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakUsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7b0JBQzNELElBQ0UsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSTt3QkFDdEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUNwQzt3QkFDQSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUNsRCxXQUFXLEVBQ1gsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTs0QkFDN0IsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3lCQUM5QjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLElBQUk7d0JBQ3hDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsRUFDdEM7d0JBQ0EsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDcEQsV0FBVyxFQUNYLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7NEJBQy9CLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt5QkFDaEM7cUJBQ0Y7b0JBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ2hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMxQyxXQUFXLEVBQ1gsY0FBYyxFQUNkLE9BQU8sRUFDUCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7NEJBQ3JCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN0QjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxhQUFhLEtBQUssU0FBUyxJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7b0JBQ3pELElBQ0UsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUk7d0JBQ25DLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQ2pDO3dCQUNBLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMvQyxXQUFXLEVBQ1gsYUFBYSxFQUNiLGFBQWEsRUFDYixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7NEJBQzFCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUMzQjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJO3dCQUNuQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxFQUNqQzt3QkFDQSxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDaEQsV0FBVyxFQUNYLGFBQWEsRUFDYixhQUFhLEVBQ2IsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFOzRCQUMzQixjQUFjLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDNUI7cUJBQ0Y7b0JBRUQsSUFDRSxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSTt3QkFDbEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFDaEM7d0JBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzlDLFdBQVcsRUFDWCxhQUFhLEVBQ2IsWUFBWSxFQUNaLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTs0QkFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQzFCO3FCQUNGO2lCQUNGO2dCQUVELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSwyQ0FBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRFLElBQUksbUJBQW1CLEtBQUssU0FBUyxJQUFJLG1CQUFtQixLQUFLLElBQUksRUFBRTtvQkFDckUsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzlELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN6QyxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7NEJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNyQjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJO3dCQUNqQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUMvQjt3QkFDQSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDOUMsV0FBVyxFQUNYLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFOzRCQUN6QixZQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDMUI7cUJBQ0Y7b0JBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN4QyxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLEtBQUssRUFDTCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNwQjtxQkFDRjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3hDLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsS0FBSyxFQUNMLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTs0QkFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3BCO3FCQUNGO29CQUVELElBQ0UsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUk7d0JBQ2hDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQzlCO3dCQUNBLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUM1QyxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7NEJBQ3ZCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUN4QjtxQkFDRjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQ3hDLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsS0FBSyxFQUNMLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTs0QkFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3BCO3FCQUNGO29CQUVELE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUNqRCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixFQUFFLENBQ0gsQ0FBQztvQkFDRixJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7d0JBQzVCLGVBQWUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3FCQUM3QjtpQkFDRjtnQkFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFbkUsSUFBSSxlQUFlLEtBQUssU0FBUyxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7b0JBQzdELElBQ0UsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUk7d0JBQy9CLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQzdCO3dCQUNBLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUM1QyxXQUFXLEVBQ1gsZUFBZSxFQUNmLFNBQVMsRUFDVCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7NEJBQ3ZCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUN4QjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJO3dCQUNqQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUMvQjt3QkFDQSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FDOUMsV0FBVyxFQUNYLGVBQWUsRUFDZixXQUFXLEVBQ1gsRUFBRSxDQUNILENBQUM7d0JBQ0YsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFOzRCQUN6QixZQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDMUI7cUJBQ0Y7b0JBRUQsSUFDRSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSTt3QkFDL0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFDN0I7d0JBQ0EsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzVDLFdBQVcsRUFDWCxlQUFlLEVBQ2YsU0FBUyxFQUNULEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTs0QkFDdkIsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ3hCO3FCQUNGO29CQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN6QyxXQUFXLEVBQ1gsZUFBZSxFQUNmLE1BQU0sRUFDTixFQUFFLENBQ0gsQ0FBQztvQkFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7d0JBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNyQjtpQkFDRjtnQkFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFbEUsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7b0JBQzNELElBQ0UsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUk7d0JBQ3BDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQ2xDO3dCQUNBLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMzQyxXQUFXLEVBQ1gsY0FBYyxFQUNkLGNBQWMsRUFDZCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7NEJBQ3RCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUN2QjtxQkFDRjtvQkFFRCxJQUNFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLElBQUk7d0JBQ3hDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsRUFDdEM7d0JBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzlDLFdBQVcsRUFDWCxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTs0QkFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQzFCO3FCQUNGO29CQUVELElBQ0UsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUk7d0JBQ2hDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQzlCO3dCQUNBLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUMvQyxXQUFXLEVBQ1gsY0FBYyxFQUNkLFVBQVUsRUFDVixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLGFBQWEsS0FBSyxJQUFJLEVBQUU7NEJBQzFCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUMzQjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLDJDQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxXQUFXLEtBQUssU0FBUyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7b0JBQ3JELElBQ0UsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUk7d0JBQy9CLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQzdCO3dCQUNBLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUN6QyxXQUFXLEVBQ1gsV0FBVyxFQUNYLFNBQVMsRUFDVCxFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7NEJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzRCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNyQjtxQkFDRjtvQkFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQzFDLFdBQVcsRUFDWCxXQUFXLEVBQ1gsT0FBTyxFQUNQLEVBQUUsQ0FDSCxDQUFDO3dCQUNGLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTs0QkFDckIsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7NEJBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3RCO3FCQUNGO29CQUVELElBQ0UsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSTt3QkFDdEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUNwQzt3QkFDQSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUNsRCxXQUFXLEVBQ1gsV0FBVyxFQUNYLFVBQVUsRUFDVixFQUFFLENBQ0gsQ0FBQzt3QkFDRixJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTs0QkFDN0IsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs0QkFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3lCQUM5QjtxQkFDRjtpQkFDRjtnQkFFRCxNQUFNLE1BQU0sR0FBbUIsRUFBRSxDQUFDO2dCQUVsQyxJQUNFLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJO29CQUNyQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUNuQztvQkFDQSxNQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM1RCxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzFELE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JCO2dCQUVELElBQ0UsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUk7b0JBQ3JDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQ25DO29CQUNBLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO29CQUNsQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzVELE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMzRCxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3BFLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO29CQUNsQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzVELE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMzRCxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3BFLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO29CQUNsQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzVELE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMzRCxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDckI7Z0JBRUQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRXBELElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUMvQixNQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztvQkFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3hFLFlBQVksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO29CQUUvQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLFNBQVMsR0FBRyxPQUFPLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsV0FBZ0I7UUFDL0IsTUFBTSxTQUFTLEdBQW1CLEVBQUUsQ0FBQztRQUVyQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxNQUFNLE9BQU8sR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDakQsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxNQUFNLE9BQU8sR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDakQsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxNQUFNLE9BQU8sR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDakQsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLFFBQVEsR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLFFBQVEsR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLFFBQVEsR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLFFBQVEsR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuRSxNQUFNLFFBQVEsR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1lBQzdCLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuRSxNQUFNLFFBQVEsR0FBaUIsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFXLEVBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEQsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLFdBQVcsQ0FBQyxN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QUFVLENBQUM7WUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFTyxLQUFLLENBQUMsZ0JBQWdCLENBQzVCLFdBQWdCLEVBQ2hCLFFBQTJCLEVBQzNCLE1BQWMsRUFDZCxLQUFhO1FBRWIsTUFBTSxJQUFJLEdBQWtCLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLE1BQU0sVUFBVSxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBRVksUUFBQSxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZUdhbGxlcnkgfSBmcm9tIFwiLi4vbW9kZWwvSW1hZ2VHYWxsZXJ5XCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vbW9kZWwvUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0UHJpY2UgfSBmcm9tIFwiLi4vbW9kZWwvUHJvZHVjdFByaWNlXCI7XHJcbmltcG9ydCB7IFNwZWNpZmljYXRpb24gfSBmcm9tIFwiLi4vbW9kZWwvU3BlY2lmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBTcGVjaWZpY2F0aW9uVHlwZSB9IGZyb20gXCIuLi9tb2RlbC9TcGVjaWZpY2F0aW9uVHlwZVwiO1xyXG5pbXBvcnQgeyBwcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlL3Byb2R1Y3Quc2VydmljZVwiO1xyXG5pbXBvcnQgeyBzcGVjS2V5U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlL3NwZWNrZXkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZS9zcGVjdHlwZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGVzR2V0TnVtYmVyLCBlc0lzRW1wdHkgfSBmcm9tIFwiLi4vdXRpbHMvZXNIZWxwZXJcIjtcclxuaW1wb3J0IHJlc3BGb3JtYXQgZnJvbSBcIi4uL3V0aWxzL3Jlc3BvbnNlL3Jlc3BGb3JtYXRcIjtcclxuXHJcbmNsYXNzIFByb2R1Y3RNYXBwZXIge1xyXG4gIGFzeW5jIG1hcFByb2R1Y3RCeUpTT04ocHJvZHVjdEpzb246IGFueSk6IFByb21pc2U8UHJvZHVjdCB8IG51bGw+IHtcclxuICAgIGxldCBydFByb2R1Y3Q6IFByb2R1Y3QgfCBudWxsID0gbnVsbDtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTWFwcGVyIFN0YXJ0IE1hcHBpbmcgLi4uLlwiKTtcclxuICAgICAgaWYgKHByb2R1Y3RKc29uICE9PSBudWxsICYmIHByb2R1Y3RKc29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInByb2R1Y3RKc29uIEhhdmUgVmFsdWUgLi4uXCIpO1xyXG4gICAgICAgIGNvbnN0IGV4UHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RCeUFsbHlOYW1lKFxyXG4gICAgICAgICAgYCR7cHJvZHVjdEpzb24uQnJhbmR9ICR7cHJvZHVjdEpzb24uTW9kZWx9YFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGV4UHJvZHVjdCAhPT0gdW5kZWZpbmVkICYmIGV4UHJvZHVjdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwcm9kdWN0IGFscmVhZHkgRXhpc3QgISFcIik7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBuZXcgUHJvZHVjdCgpO1xyXG5cclxuICAgICAgICBwcm9kdWN0LmFsaWFzTmFtZSA9IGAke3Byb2R1Y3RKc29uLkJyYW5kfSAke3Byb2R1Y3RKc29uLk1vZGVsfWA7XHJcbiAgICAgICAgcHJvZHVjdC5icmFuZCA9IHByb2R1Y3RKc29uLkJyYW5kO1xyXG4gICAgICAgIHByb2R1Y3QubW9kZWwgPSBwcm9kdWN0SnNvbi5Nb2RlbDtcclxuICAgICAgICBwcm9kdWN0LnRpdGxlID0gYCR7cHJvZHVjdEpzb24uQnJhbmR9ICR7cHJvZHVjdEpzb24uTW9kZWx9YDtcclxuXHJcbiAgICAgICAgY29uc3Qgc3BlY3M6IFNwZWNpZmljYXRpb25bXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBzcGVjc05ldFR5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZCgxKTtcclxuXHJcbiAgICAgICAgaWYgKHNwZWNzTmV0VHlwZSAhPT0gbnVsbCAmJiBzcGVjc05ldFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3Qgc3BjVGVjID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgc3BlY3NOZXRUeXBlLFxyXG4gICAgICAgICAgICBcIlRlY2hub2xvZ3lcIixcclxuICAgICAgICAgICAgMVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChzcGNUZWMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3BjVGVjLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1RlYyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3Qgc3BjMmdCcmFuZCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgIHNwZWNzTmV0VHlwZSxcclxuICAgICAgICAgICAgXCIyRy1iYW5kc1wiLFxyXG4gICAgICAgICAgICAyXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKHNwYzJnQnJhbmQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3BjMmdCcmFuZC5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgc3BlY3MucHVzaChzcGMyZ0JyYW5kKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBzcGMzZ0JyYW5kID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgc3BlY3NOZXRUeXBlLFxyXG4gICAgICAgICAgICBcIjNHLWJhbmRzXCIsXHJcbiAgICAgICAgICAgIDNcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAoc3BjM2dCcmFuZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcGMzZ0JyYW5kLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICBzcGVjcy5wdXNoKHNwYzNnQnJhbmQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHNwYzRnQnJhbmQgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICBzcGVjc05ldFR5cGUsXHJcbiAgICAgICAgICAgIFwiNEctYmFuZHNcIixcclxuICAgICAgICAgICAgNFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChzcGM0Z0JyYW5kICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNwYzRnQnJhbmQucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjNGdCcmFuZCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3Qgc3BjNWdCcmFuZCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgIHNwZWNzTmV0VHlwZSxcclxuICAgICAgICAgICAgXCI1Ry1iYW5kc1wiLFxyXG4gICAgICAgICAgICA1XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKHNwYzVnQnJhbmQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3BjNWdCcmFuZC5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgc3BlY3MucHVzaChzcGM1Z0JyYW5kKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBzcGNTcGVlZCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgIHNwZWNzTmV0VHlwZSxcclxuICAgICAgICAgICAgXCJTcGVlZFwiLFxyXG4gICAgICAgICAgICA2XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKHNwY1NwZWVkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNwY1NwZWVkLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1NwZWVkKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJHUFJTXCJdICE9PSBudWxsICYmIHByb2R1Y3RKc29uW1wiR1BSU1wiXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNHUFJTID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNzTmV0VHlwZSxcclxuICAgICAgICAgICAgICBcIkdQUlNcIixcclxuICAgICAgICAgICAgICAzOVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjR1BSUyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0dQUlMucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNHUFJTKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwcm9kdWN0SnNvbltcIkVER0VcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJFREdFXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY0VER0UgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BlY3NOZXRUeXBlLFxyXG4gICAgICAgICAgICAgIFwiRURHRVwiLFxyXG4gICAgICAgICAgICAgIDQwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNFREdFICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjRURHRS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0VER0UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzcGVjc0xhdW5jaFR5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZCgyKTtcclxuICAgICAgICBpZiAoc3BlY3NMYXVuY2hUeXBlICE9PSBudWxsICYmIHNwZWNzTGF1bmNoVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiQW5ub3VuY2VkXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiQW5ub3VuY2VkXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjQW5ub3VuY2VkID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNzTGF1bmNoVHlwZSxcclxuICAgICAgICAgICAgICBcIkFubm91bmNlZFwiLFxyXG4gICAgICAgICAgICAgIDdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0Fubm91bmNlZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0Fubm91bmNlZC5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0Fubm91bmNlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJTdGF0dXNcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJTdGF0dXNcIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjU3RhdHVzID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNzTGF1bmNoVHlwZSxcclxuICAgICAgICAgICAgICBcIlN0YXR1c1wiLFxyXG4gICAgICAgICAgICAgIDhcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY1N0YXR1cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY1N0YXR1cy5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1N0YXR1cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwZWNCb2R5VHlwZSA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS5nZXRCeUlkKDMpO1xyXG4gICAgICAgIGlmIChzcGVjQm9keVR5cGUgIT09IHVuZGVmaW5lZCAmJiBzcGVjQm9keVR5cGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJEaW1lbnNpb25zXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiRGltZW5zaW9uc1wiXSAhPT0gXCJcIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY0RpbWVuc2lvbnMgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BlY0JvZHlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiRGltZW5zaW9uc1wiLFxyXG4gICAgICAgICAgICAgIDlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0RpbWVuc2lvbnMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNEaW1lbnNpb25zLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjRGltZW5zaW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJXZWlnaHRcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJXZWlnaHRcIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjU0lNID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNCb2R5VHlwZSxcclxuICAgICAgICAgICAgICBcIldlaWdodFwiLFxyXG4gICAgICAgICAgICAgIDEwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNTSU0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNTSU0ucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNTSU0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHByb2R1Y3RKc29uW1wiQnVpbGRcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJCdWlsZFwiXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNCdWlsZCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjQm9keVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJCdWlsZFwiLFxyXG4gICAgICAgICAgICAgIDExXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNCdWlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0J1aWxkLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjQnVpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHByb2R1Y3RKc29uW1wiU0lNXCJdICE9PSBudWxsICYmIHByb2R1Y3RKc29uW1wiU0lNXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY1NJTSA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjQm9keVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJTSU1cIixcclxuICAgICAgICAgICAgICAxMlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjU0lNICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjU0lNLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjU0lNKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BlY0Rpc3BsYXlUeXBlID0gYXdhaXQgc3BlY2lmaWNhdGlvblR5cGVTZXJ2aWNlLmdldEJ5SWQoNCk7XHJcblxyXG4gICAgICAgIGlmIChzcGVjRGlzcGxheVR5cGUgIT09IHVuZGVmaW5lZCAmJiBzcGVjRGlzcGxheVR5cGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmIChwcm9kdWN0SnNvbltcIlR5cGVcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJUeXBlXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY0RUeXBlID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNEaXNwbGF5VHlwZSxcclxuICAgICAgICAgICAgICBcIlR5cGVcIixcclxuICAgICAgICAgICAgICAxM1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjRFR5cGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNEVHlwZS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0RUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwcm9kdWN0SnNvbltcIlNpemVcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJTaXplXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY1NpemUgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BlY0Rpc3BsYXlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiU2l6ZVwiLFxyXG4gICAgICAgICAgICAgIDE0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNTaXplICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjU2l6ZS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1NpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIlJlc29sdXRpb25cIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJSZXNvbHV0aW9uXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjUmVzb2x1dGlvbiA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjRGlzcGxheVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJSZXNvbHV0aW9uXCIsXHJcbiAgICAgICAgICAgICAgMTVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY1Jlc29sdXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNSZXNvbHV0aW9uLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjUmVzb2x1dGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiTXVsdGl0b3VjaFwiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIk11bHRpdG91Y2hcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNNdWx0aXRvdWNoID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNEaXNwbGF5VHlwZSxcclxuICAgICAgICAgICAgICBcIk11bHRpdG91Y2hcIixcclxuICAgICAgICAgICAgICA0MVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjTXVsdGl0b3VjaCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY011bHRpdG91Y2gucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNNdWx0aXRvdWNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJQcm90ZWN0aW9uXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiUHJvdGVjdGlvblwiXSAhPT0gXCJcIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY1Byb3RlY3Rpb24gPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BlY0Rpc3BsYXlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiUHJvdGVjdGlvblwiLFxyXG4gICAgICAgICAgICAgIDQyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNQcm90ZWN0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjUHJvdGVjdGlvbi5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1Byb3RlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIlByb3RlY3Rpb25cIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJQcm90ZWN0aW9uXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjUHJvdGVjdGlvbiA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjRGlzcGxheVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJQcm90ZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgNDJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY1Byb3RlY3Rpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNQcm90ZWN0aW9uLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjUHJvdGVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwZWNQbGF0Zm9ybVR5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZCg1KTtcclxuXHJcbiAgICAgICAgaWYgKHNwZWNQbGF0Zm9ybVR5cGUgIT09IHVuZGVmaW5lZCAmJiBzcGVjUGxhdGZvcm1UeXBlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJPU1wiXSAhPT0gbnVsbCAmJiBwcm9kdWN0SnNvbltcIk9TXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY09TID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNQbGF0Zm9ybVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJPU1wiLFxyXG4gICAgICAgICAgICAgIDE2XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNPUyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY09TLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjT1MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkNoaXBzZXRcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJDaGlwc2V0XCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjQ2hpcHNldCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjUGxhdGZvcm1UeXBlLFxyXG4gICAgICAgICAgICAgIFwiQ2hpcHNldFwiLFxyXG4gICAgICAgICAgICAgIDE3XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNDaGlwc2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjQ2hpcHNldC5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0NoaXBzZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHByb2R1Y3RKc29uW1wiQ1BVXCJdICE9PSBudWxsICYmIHByb2R1Y3RKc29uW1wiQ1BVXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY0NQVSA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjUGxhdGZvcm1UeXBlLFxyXG4gICAgICAgICAgICAgIFwiQ1BVXCIsXHJcbiAgICAgICAgICAgICAgMThcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0NQVSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0NQVS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0NQVSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJHUFVcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJHUFVcIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjR1BVID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNQbGF0Zm9ybVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJHUFVcIixcclxuICAgICAgICAgICAgICAxOVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjR1BVICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjR1BVLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjR1BVKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BlY01lbW9yeVR5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZCg2KTtcclxuXHJcbiAgICAgICAgaWYgKHNwZWNNZW1vcnlUeXBlICE9PSB1bmRlZmluZWQgJiYgc3BlY01lbW9yeVR5cGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJDYXJkLXNsb3RcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJDYXJkLXNsb3RcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNDYXJkU2xvdCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjTWVtb3J5VHlwZSxcclxuICAgICAgICAgICAgICBcIkNhcmQtc2xvdFwiLFxyXG4gICAgICAgICAgICAgIDIwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNDYXJkU2xvdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0NhcmRTbG90LnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjQ2FyZFNsb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkludGVybmFsXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiSW50ZXJuYWxcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNJbnRlcm5hbCA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjTWVtb3J5VHlwZSxcclxuICAgICAgICAgICAgICBcIkludGVybmFsXCIsXHJcbiAgICAgICAgICAgICAgMjFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0ludGVybmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjSW50ZXJuYWwucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNJbnRlcm5hbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJSQU1cIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJSQU1cIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjUkFNID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNNZW1vcnlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiUkFNXCIsXHJcbiAgICAgICAgICAgICAgNDNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY1JBTSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY1JBTS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1JBTSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwZWNDYW1lcmFUeXBlID0gYXdhaXQgc3BlY2lmaWNhdGlvblR5cGVTZXJ2aWNlLmdldEJ5SWQoNyk7XHJcblxyXG4gICAgICAgIGlmIChzcGVjQ2FtZXJhVHlwZSAhPT0gdW5kZWZpbmVkICYmIHNwZWNDYW1lcmFUeXBlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiUHJpbWFyeS1jYW1lcmFcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJQcmltYXJ5LWNhbWVyYVwiXSAhPT0gXCJcIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY1ByaW1hcnlDYW1lcmEgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BlY0NhbWVyYVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJQcmltYXJ5LWNhbWVyYVwiLFxyXG4gICAgICAgICAgICAgIDQ0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNQcmltYXJ5Q2FtZXJhICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjUHJpbWFyeUNhbWVyYS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY1ByaW1hcnlDYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIlNlY29uZGFyeS1jYW1lcmFcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJTZWNvbmRhcnktY2FtZXJhXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjU2Vjb25kYXJ5Q2FtZXJhID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwZWNDYW1lcmFUeXBlLFxyXG4gICAgICAgICAgICAgIFwiU2Vjb25kYXJ5LWNhbWVyYVwiLFxyXG4gICAgICAgICAgICAgIDQ1XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNTZWNvbmRhcnlDYW1lcmEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNTZWNvbmRhcnlDYW1lcmEucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNTZWNvbmRhcnlDYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHByb2R1Y3RKc29uW1wiVmlkZW9cIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJWaWRlb1wiXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNWaWRlbyA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGVjQ2FtZXJhVHlwZSxcclxuICAgICAgICAgICAgICBcIlZpZGVvXCIsXHJcbiAgICAgICAgICAgICAgMjRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY1ZpZGVvICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjVmlkZW8ucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNWaWRlbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlcGNTb3VuZFR5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZCg4KTtcclxuICAgICAgICBpZiAoc2VwY1NvdW5kVHlwZSAhPT0gdW5kZWZpbmVkICYmIHNlcGNTb3VuZFR5cGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJBbGVydC10eXBlc1wiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkFsZXJ0LXR5cGVzXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjQWxlcnRUeXBlcyA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzZXBjU291bmRUeXBlLFxyXG4gICAgICAgICAgICAgIFwiQWxlcnQtdHlwZXNcIixcclxuICAgICAgICAgICAgICA0NlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjQWxlcnRUeXBlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0FsZXJ0VHlwZXMucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNBbGVydFR5cGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJMb3Vkc3BlYWtlclwiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkxvdWRzcGVha2VyXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjTG91ZHNwZWFrZXIgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc2VwY1NvdW5kVHlwZSxcclxuICAgICAgICAgICAgICBcIkxvdWRzcGVha2VyXCIsXHJcbiAgICAgICAgICAgICAgMjZcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0xvdWRzcGVha2VyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjTG91ZHNwZWFrZXIucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNMb3Vkc3BlYWtlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiMy41bW0tamFja1wiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIjMuNW1tLWphY2tcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGMzXzVtbUphY2sgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc2VwY1NvdW5kVHlwZSxcclxuICAgICAgICAgICAgICBcIjMuNW1tLWphY2tcIixcclxuICAgICAgICAgICAgICAyN1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjM181bW1KYWNrICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjM181bW1KYWNrLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjM181bW1KYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BjQ29ubmVjdGl2aXR5VHlwZSA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS5nZXRCeUlkKDkpO1xyXG5cclxuICAgICAgICBpZiAoc3BjQ29ubmVjdGl2aXR5VHlwZSAhPT0gdW5kZWZpbmVkICYmIHNwY0Nvbm5lY3Rpdml0eVR5cGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmIChwcm9kdWN0SnNvbltcIldMQU5cIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJXTEFOXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY1dMQU4gPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BjQ29ubmVjdGl2aXR5VHlwZSxcclxuICAgICAgICAgICAgICBcIldMQU5cIixcclxuICAgICAgICAgICAgICAyOFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjV0xBTiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY1dMQU4ucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNXTEFOKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJCbHVldG9vdGhcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJCbHVldG9vdGhcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNCbHVldG9vdGggPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BjQ29ubmVjdGl2aXR5VHlwZSxcclxuICAgICAgICAgICAgICBcIkJsdWV0b290aFwiLFxyXG4gICAgICAgICAgICAgIDI5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNCbHVldG9vdGggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNCbHVldG9vdGgucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNCbHVldG9vdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHByb2R1Y3RKc29uW1wiR1BTXCJdICE9PSBudWxsICYmIHByb2R1Y3RKc29uW1wiR1BTXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY0dQUyA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGNDb25uZWN0aXZpdHlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiR1BTXCIsXHJcbiAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0dQUyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0dQUy5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0dQUyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJORkNcIl0gIT09IG51bGwgJiYgcHJvZHVjdEpzb25bXCJORkNcIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjTkZDID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwY0Nvbm5lY3Rpdml0eVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJORkNcIixcclxuICAgICAgICAgICAgICAzMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjTkZDICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjTkZDLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjTkZDKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJGTS1yYWRpb1wiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkZNLXJhZGlvXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjRk1SYWRpbyA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGNDb25uZWN0aXZpdHlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiRk0tcmFkaW9cIixcclxuICAgICAgICAgICAgICAzMlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjRk1SYWRpbyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0ZNUmFkaW8ucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNGTVJhZGlvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwcm9kdWN0SnNvbltcIlVTQlwiXSAhPT0gbnVsbCAmJiBwcm9kdWN0SnNvbltcIlVTQlwiXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNVU0IgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BjQ29ubmVjdGl2aXR5VHlwZSxcclxuICAgICAgICAgICAgICBcIlVTQlwiLFxyXG4gICAgICAgICAgICAgIDMzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNVU0IgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNVU0IucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNVU0IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3Qgc3BjSW5mcmFyZWRQb3J0ID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgc3BjQ29ubmVjdGl2aXR5VHlwZSxcclxuICAgICAgICAgICAgXCJJbmZyYXJlZC1wb3J0XCIsXHJcbiAgICAgICAgICAgIDQ3XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKHNwY0luZnJhcmVkUG9ydCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcGNJbmZyYXJlZFBvcnQucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjSW5mcmFyZWRQb3J0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNwY0ZlYXR1cmVzVHlwZSA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS5nZXRCeUlkKDEwKTtcclxuXHJcbiAgICAgICAgaWYgKHNwY0ZlYXR1cmVzVHlwZSAhPT0gdW5kZWZpbmVkICYmIHNwY0ZlYXR1cmVzVHlwZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIlNlbnNvcnNcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJTZW5zb3JzXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjU2Vuc29ycyA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGNGZWF0dXJlc1R5cGUsXHJcbiAgICAgICAgICAgICAgXCJTZW5zb3JzXCIsXHJcbiAgICAgICAgICAgICAgMzRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY1NlbnNvcnMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNTZW5zb3JzLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjU2Vuc29ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiTWVzc2FnaW5nXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiTWVzc2FnaW5nXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjTWVzc2FnaW5nID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwY0ZlYXR1cmVzVHlwZSxcclxuICAgICAgICAgICAgICBcIk1lc3NhZ2luZ1wiLFxyXG4gICAgICAgICAgICAgIDQ4XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNNZXNzYWdpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNNZXNzYWdpbmcucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNNZXNzYWdpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkJyb3dzZXJcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJCcm93c2VyXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjQnJvd3NlciA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGNGZWF0dXJlc1R5cGUsXHJcbiAgICAgICAgICAgICAgXCJCcm93c2VyXCIsXHJcbiAgICAgICAgICAgICAgNDlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0Jyb3dzZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBzcGNCcm93c2VyLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjQnJvd3Nlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBzcGNKYXZhID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgc3BjRmVhdHVyZXNUeXBlLFxyXG4gICAgICAgICAgICBcIkphdmFcIixcclxuICAgICAgICAgICAgNTBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAoc3BjSmF2YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcGNKYXZhLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0phdmEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3BjQmF0dGVyeVR5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZCgxMCk7XHJcblxyXG4gICAgICAgIGlmIChzcGNCYXR0ZXJ5VHlwZSAhPT0gdW5kZWZpbmVkICYmIHNwY0JhdHRlcnlUeXBlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiQmF0dGVyeS10eXBlXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiQmF0dGVyeS10eXBlXCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjQnRUeXBlID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwY0JhdHRlcnlUeXBlLFxyXG4gICAgICAgICAgICAgIFwiQmF0dGVyeS10eXBlXCIsXHJcbiAgICAgICAgICAgICAgMzVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0J0VHlwZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0J0VHlwZS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0J0VHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiQmF0dGVyeS1jYXBhY2l0eVwiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIkJhdHRlcnktY2FwYWNpdHlcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNCdENhcFR5cGUgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BjQmF0dGVyeVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJCYXR0ZXJ5LWNhcGFjaXR5XCIsXHJcbiAgICAgICAgICAgICAgNTFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHNwY0J0Q2FwVHlwZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0J0Q2FwVHlwZS5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0J0Q2FwVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiQ2hhcmdpbmdcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJDaGFyZ2luZ1wiXSAhPT0gXCJcIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwY0J0Q2hhcmdpbmcgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BjQmF0dGVyeVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJDaGFyZ2luZ1wiLFxyXG4gICAgICAgICAgICAgIDUyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNCdENoYXJnaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgc3BjQnRDaGFyZ2luZy5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgICAgICBzcGVjcy5wdXNoKHNwY0J0Q2hhcmdpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzcGNNb3JlVHlwZSA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS5nZXRCeUlkKDEzKTtcclxuICAgICAgICBpZiAoc3BjTW9yZVR5cGUgIT09IHVuZGVmaW5lZCAmJiBzcGNNb3JlVHlwZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIk1hZGUtYnlcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgICAgcHJvZHVjdEpzb25bXCJNYWRlLWJ5XCJdICE9PSBcIlwiXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjTWFkZSA9IGF3YWl0IHRoaXMubWFwU3BlY2lmaWNhdGlvbihcclxuICAgICAgICAgICAgICBwcm9kdWN0SnNvbixcclxuICAgICAgICAgICAgICBzcGNNb3JlVHlwZSxcclxuICAgICAgICAgICAgICBcIk1hZGUtYnlcIixcclxuICAgICAgICAgICAgICA1M1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjTWFkZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY01hZGUucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNNYWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwcm9kdWN0SnNvbltcIkNvbG9yXCJdICE9PSBudWxsICYmIHByb2R1Y3RKc29uW1wiQ29sb3JcIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BjQ29sb3IgPSBhd2FpdCB0aGlzLm1hcFNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgcHJvZHVjdEpzb24sXHJcbiAgICAgICAgICAgICAgc3BjTW9yZVR5cGUsXHJcbiAgICAgICAgICAgICAgXCJDb2xvclwiLFxyXG4gICAgICAgICAgICAgIDM2XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChzcGNDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY0NvbG9yLnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICAgICAgICAgIHNwZWNzLnB1c2goc3BjQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9kdWN0SnNvbltcIk90aGVyLUZlYXR1cmVzXCJdICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIHByb2R1Y3RKc29uW1wiT3RoZXItRmVhdHVyZXNcIl0gIT09IFwiXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGNPdGhlckZlYXR1cmVzID0gYXdhaXQgdGhpcy5tYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RKc29uLFxyXG4gICAgICAgICAgICAgIHNwY01vcmVUeXBlLFxyXG4gICAgICAgICAgICAgIFwiQ2hhcmdpbmdcIixcclxuICAgICAgICAgICAgICA1NFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoc3BjT3RoZXJGZWF0dXJlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHNwY090aGVyRmVhdHVyZXMucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgICAgICAgICAgc3BlY3MucHVzaChzcGNPdGhlckZlYXR1cmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2VzOiBJbWFnZUdhbGxlcnlbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwcm9kdWN0SnNvbltcIkltYWdlLTEtQmxhY2tcIl0gIT09IG51bGwgJiZcclxuICAgICAgICAgIHByb2R1Y3RKc29uW1wiSW1hZ2UtMS1CbGFja1wiXSAhPT0gXCJcIlxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc3QgaW1hZ2UxID0gbmV3IEltYWdlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgaW1hZ2UxLmFsdFRhZyA9IGAke3Byb2R1Y3RKc29uLkJyYW5kfSAke3Byb2R1Y3RKc29uLk1vZGVsfWA7XHJcbiAgICAgICAgICBpbWFnZTEubmFtZSA9IGAke3Byb2R1Y3RKc29uLkJyYW5kfSAke3Byb2R1Y3RKc29uLk1vZGVsfWA7XHJcbiAgICAgICAgICBpbWFnZTEudGl0bGUgPSBgJHtwcm9kdWN0SnNvbi5CcmFuZH0gJHtwcm9kdWN0SnNvbi5Nb2RlbH1gO1xyXG4gICAgICAgICAgaW1hZ2UxLmxvY2F0aW9uID0gcHJvZHVjdEpzb25bXCJJbWFnZS0xLUJsYWNrXCJdO1xyXG4gICAgICAgICAgaW1hZ2VzLnB1c2goaW1hZ2UxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHByb2R1Y3RKc29uW1wiSW1hZ2UtMi1XaGl0ZVwiXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgcHJvZHVjdEpzb25bXCJJbWFnZS0yLVdoaXRlXCJdICE9PSBcIlwiXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCBpbWFnZTIgPSBuZXcgSW1hZ2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICBpbWFnZTIuYWx0VGFnID0gYCR7cHJvZHVjdEpzb24uQnJhbmR9ICR7cHJvZHVjdEpzb24uTW9kZWx9YDtcclxuICAgICAgICAgIGltYWdlMi5uYW1lID0gYCR7cHJvZHVjdEpzb24uQnJhbmR9ICR7cHJvZHVjdEpzb24uTW9kZWx9YDtcclxuICAgICAgICAgIGltYWdlMi50aXRsZSA9IGAke3Byb2R1Y3RKc29uLkJyYW5kfSAke3Byb2R1Y3RKc29uLk1vZGVsfWA7XHJcbiAgICAgICAgICBpbWFnZTIubG9jYXRpb24gPSBwcm9kdWN0SnNvbltcIkltYWdlLTItV2hpdGVcIl07XHJcbiAgICAgICAgICBpbWFnZXMucHVzaChpbWFnZTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJvZHVjdEpzb25bXCJJbWFnZS0zXCJdICE9PSBudWxsICYmIHByb2R1Y3RKc29uW1wiSW1hZ2UtM1wiXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgY29uc3QgaW1hZ2UzID0gbmV3IEltYWdlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgaW1hZ2UzLmFsdFRhZyA9IGAke3Byb2R1Y3RKc29uLkJyYW5kfSAke3Byb2R1Y3RKc29uLk1vZGVsfWA7XHJcbiAgICAgICAgICBpbWFnZTMubmFtZSA9IGAke3Byb2R1Y3RKc29uLkJyYW5kfSAke3Byb2R1Y3RKc29uLk1vZGVsfWA7XHJcbiAgICAgICAgICBpbWFnZTMudGl0bGUgPSBgJHtwcm9kdWN0SnNvbi5CcmFuZH0gJHtwcm9kdWN0SnNvbi5Nb2RlbH1gO1xyXG4gICAgICAgICAgaW1hZ2UzLmxvY2F0aW9uID0gcHJvZHVjdEpzb25bXCJJbWFnZS0zXCJdO1xyXG4gICAgICAgICAgaW1hZ2VzLnB1c2goaW1hZ2UzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb2R1Y3RKc29uW1wiSW1hZ2UtNFwiXSAhPT0gbnVsbCAmJiBwcm9kdWN0SnNvbltcIkltYWdlLTRcIl0gIT09IFwiXCIpIHtcclxuICAgICAgICAgIGNvbnN0IGltYWdlNCA9IG5ldyBJbWFnZUdhbGxlcnkoKTtcclxuICAgICAgICAgIGltYWdlNC5hbHRUYWcgPSBgJHtwcm9kdWN0SnNvbi5CcmFuZH0gJHtwcm9kdWN0SnNvbi5Nb2RlbH1gO1xyXG4gICAgICAgICAgaW1hZ2U0Lm5hbWUgPSBgJHtwcm9kdWN0SnNvbi5CcmFuZH0gJHtwcm9kdWN0SnNvbi5Nb2RlbH1gO1xyXG4gICAgICAgICAgaW1hZ2U0LnRpdGxlID0gYCR7cHJvZHVjdEpzb24uQnJhbmR9ICR7cHJvZHVjdEpzb24uTW9kZWx9YDtcclxuICAgICAgICAgIGltYWdlNC5sb2NhdGlvbiA9IHByb2R1Y3RKc29uW1wiSW1hZ2UtNFwiXTtcclxuICAgICAgICAgIGltYWdlcy5wdXNoKGltYWdlNCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9kdWN0LnByaWNlcyA9IHRoaXMubWFwUHJvZHVjdFByaWNlcyhwcm9kdWN0SnNvbik7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0LnByaWNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGNvbnN0IHByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgICAgIHByb2R1Y3RQcmljZS5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiUHJpY2VcIl0pO1xyXG4gICAgICAgICAgcHJvZHVjdFByaWNlLnRpdGxlID0gYCR7cHJvZHVjdEpzb25bXCJSQU1cIl19ICR7cHJvZHVjdEpzb25bXCJQcmljZVwiXX0gVEtgO1xyXG4gICAgICAgICAgcHJvZHVjdFByaWNlLnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG5cclxuICAgICAgICAgIHByb2R1Y3QucHJpY2VzLnB1c2gocHJvZHVjdFByaWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvZHVjdC5zcGVjaWZpY2F0aW9ucyA9IHNwZWNzO1xyXG4gICAgICAgIHByb2R1Y3QuYWRkQWxsSW1hZ2UoaW1hZ2VzKTtcclxuICAgICAgICBydFByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicHJvZHVjdEpzb24gSGF2ZW4ndCBWYWx1ZSAuLi5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUHJvZHVjdCBNYXAgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgY29uc29sZS5sb2coXCJQcm9kdWN0IE1hcCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJ0UHJvZHVjdDtcclxuICB9XHJcblxyXG4gIG1hcFByb2R1Y3RQcmljZXMocHJvZHVjdEpzb246IGFueSk6IFByb2R1Y3RQcmljZVtdIHtcclxuICAgIGNvbnN0IHByaWNlTGlzdDogUHJvZHVjdFByaWNlW10gPSBbXTtcclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCIxNlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiMTZcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCIxNlwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDE2R0IpICR7cHJvZHVjdEpzb25bXCIxNlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCIzMlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiMzJcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UzMjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTMyLnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCIzMlwiXSk7XHJcbiAgICAgIHByaWNlMzIudGl0bGUgPSBgKDMyR0IpICR7cHJvZHVjdEpzb25bXCIzMlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTMyLnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTMyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCI2NFwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiNjRcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2U2NDogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTY0LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCI2NFwiXSk7XHJcbiAgICAgIHByaWNlNjQudGl0bGUgPSBgKDY0R0IpICR7cHJvZHVjdEpzb25bXCI2NFwiXX0gVEtgO1xyXG4gICAgICBwcmljZTY0LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTY0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCIxMjhcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjEyOFwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTEyODogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTEyOC5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiMTI4XCJdKTtcclxuICAgICAgcHJpY2UxMjgudGl0bGUgPSBgKDEyOEdCKSAke3Byb2R1Y3RKc29uW1wiMTI4XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTI4LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTEyOCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiMjU2XCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCIyNTZcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UyNTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UyNTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcIjI1NlwiXSk7XHJcbiAgICAgIHByaWNlMjU2LnRpdGxlID0gYCgyNTZHQikgJHtwcm9kdWN0SnNvbltcIjI1NlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTI1Ni50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UyNTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcIjUxMlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiNTEyXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlNTEyOiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlNTEyLnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCI1MTJcIl0pO1xyXG4gICAgICBwcmljZTUxMi50aXRsZSA9IGAoNTEyR0IpICR7cHJvZHVjdEpzb25bXCI1MTJcIl19IFRLYDtcclxuICAgICAgcHJpY2U1MTIudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlNTEyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCIxVEJcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjFUQlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTFUQjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTFUQi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiMVRCXCJdKTtcclxuICAgICAgcHJpY2UxVEIudGl0bGUgPSBgKDFUQkdCKSAke3Byb2R1Y3RKc29uW1wiMVRCXCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMVRCLnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTFUQik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS0xNlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS0xNlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZVUxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZVUxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS0xNlwiXSk7XHJcbiAgICAgIHByaWNlVTE2LnRpdGxlID0gYCgxNkdCKSAke3Byb2R1Y3RKc29uW1widS0xNlwiXX0gVEtgO1xyXG4gICAgICBwcmljZVUxNi50eXBlID0gYFVub2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZVUxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS0zMlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS0zMlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZVUzMjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZVUzMi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS0zMlwiXSk7XHJcbiAgICAgIHByaWNlVTMyLnRpdGxlID0gYCgzMkdCKSAke3Byb2R1Y3RKc29uW1widS0zMlwiXX0gVEtgO1xyXG4gICAgICBwcmljZVUzMi50eXBlID0gYFVub2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZVUzMik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS02NFwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS02NFwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZVU2NDogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZVU2NC5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS02NFwiXSk7XHJcbiAgICAgIHByaWNlVTY0LnRpdGxlID0gYCg2NEdCKSAke3Byb2R1Y3RKc29uW1widS02NFwiXX0gVEtgO1xyXG4gICAgICBwcmljZVU2NC50eXBlID0gYFVub2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZVU2NCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS0xMjhcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcInUtMTI4XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlVTEyODogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZVUxMjgucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtMTI4XCJdKTtcclxuICAgICAgcHJpY2VVMTI4LnRpdGxlID0gYCgxMjhHQikgJHtwcm9kdWN0SnNvbltcInUtMTI4XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlVTEyOC50eXBlID0gYFVub2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZVUxMjgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcInUtMjU2XCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCJ1LTI1NlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZVUyNTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2VVMjU2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCJ1LTI1NlwiXSk7XHJcbiAgICAgIHByaWNlVTI1Ni50aXRsZSA9IGAoMjU2R0IpICR7cHJvZHVjdEpzb25bXCJ1LTI1NlwiXX0gVEtgO1xyXG4gICAgICBwcmljZVUyNTYudHlwZSA9IGBVbm9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2VVMjU2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCJ1LTUxMlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS01MTJcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2VVNTEyOiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlVTUxMi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS01MTJcIl0pO1xyXG4gICAgICBwcmljZVU1MTIudGl0bGUgPSBgKDUxMkdCKSAke3Byb2R1Y3RKc29uW1widS01MTJcIl19IFRLYDtcclxuICAgICAgcHJpY2VVNTEyLnR5cGUgPSBgVW5vZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlVTUxMik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS0xVEJcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcInUtMVRCXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlVTFUQjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZVUxVEIucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtMVRCXCJdKTtcclxuICAgICAgcHJpY2VVMVRCLnRpdGxlID0gYCgxVEJHQikgJHtwcm9kdWN0SnNvbltcInUtMVRCXCJdfSBUS2A7XHJcbiAgICAgIHByaWNlVTFUQi50eXBlID0gYFVub2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZVUxVEIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcIjIvMzJcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjIvMzJcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCIyLzMyXCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoMi8zMkdCKSAke3Byb2R1Y3RKc29uW1wiMi8zMlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCIzLzMyXCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCIzLzMyXCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiMy8zMlwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDMvMzIgR0IpICR7cHJvZHVjdEpzb25bXCIzLzMyXCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcIjQvNjRcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjQvNjRcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCI0LzY0XCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoNC82NCBHQikgJHtwcm9kdWN0SnNvbltcIjQvNjRcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiNC8xMjhcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjQvMTI4XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiNC8xMjhcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg0LzEyOCBHQikgJHtwcm9kdWN0SnNvbltcIjQvMTI4XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcIjYvNjRcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjYvNjRcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCI2LzY0XCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoNi82NCBHQikgJHtwcm9kdWN0SnNvbltcIjYvNjRcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiNi8xMjhcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjYvMTI4XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiNi8xMjhcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg2LzEyOCBHQikgJHtwcm9kdWN0SnNvbltcIjYvMTI4XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcIjYvMjU2XCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCI2LzI1NlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcIjYvMjU2XCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoNi8yNTYgR0IpICR7cHJvZHVjdEpzb25bXCI2LzI1NlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCI4LzEyOFwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiOC8xMjhcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCI4LzEyOFwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDgvMTI4IEdCKSAke3Byb2R1Y3RKc29uW1wiOC8xMjhcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiOC8yNTZcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjgvMjU2XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiOC8yNTZcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg4LzI1NiBHQikgJHtwcm9kdWN0SnNvbltcIjgvMjU2XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgcHJvZHVjdEpzb25bXCIoMTJHQisxMjhHQilcIl0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBwcm9kdWN0SnNvbltcIigxMkdCKzEyOEdCKVwiXSAhPT0gXCJcIlxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiKDEyR0IrMTI4R0IpXCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoMTIvMTI4KSBHQiAke3Byb2R1Y3RKc29uW1wiKDEyR0IrMTI4R0IpXCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgcHJvZHVjdEpzb25bXCIoMTZHQi8yNTZHQlwiXSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHByb2R1Y3RKc29uW1wiKDE2R0IvMjU2R0JcIl0gIT09IFwiXCJcclxuICAgICkge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcIigxNkdCLzI1NkdCXCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoMTYvMjU2KSBHQiAke3Byb2R1Y3RKc29uW1wiKDE2R0IvMjU2R0JcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBwcm9kdWN0SnNvbltcIigxOEdCKzUxMkdCKVwiXSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHByb2R1Y3RKc29uW1wiKDE4R0IrNTEyR0IpXCJdICE9PSBcIlwiXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCIoMThHQis1MTJHQilcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgxOC81MTIpIEdCICR7cHJvZHVjdEpzb25bXCIoMThHQis1MTJHQilcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS0yLzMyXCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCJ1LTIvMzJcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCJ1LTIvMzJcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgyLzMyR0IpICR7cHJvZHVjdEpzb25bXCJ1LTIvMzJcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS0zLzMyXCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCJ1LTMvMzJcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCJ1LTMvMzJcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgzLzMyIEdCKSAke3Byb2R1Y3RKc29uW1widS0zLzMyXCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcInUtNC82NFwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS00LzY0XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS00LzY0XCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoNC82NCBHQikgJHtwcm9kdWN0SnNvbltcInUtNC82NFwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCJ1LTQvMTI4XCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCJ1LTQvMTI4XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS00LzEyOFwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDQvMTI4IEdCKSAke3Byb2R1Y3RKc29uW1widS00LzEyOFwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCJ1LTYvNjRcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcInUtNi82NFwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtNi82NFwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDYvNjQgR0IpICR7cHJvZHVjdEpzb25bXCJ1LTYvNjRcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS02LzEyOFwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS02LzEyOFwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtNi8xMjhcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg2LzEyOCBHQikgJHtwcm9kdWN0SnNvbltcInUtNi8xMjhcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS02LzI1NlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS02LzI1NlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtNi8yNTZcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg2LzI1NiBHQikgJHtwcm9kdWN0SnNvbltcInUtNi8yNTZcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS04LzEyOFwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS04LzEyOFwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtOC8xMjhcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg4LzEyOCBHQikgJHtwcm9kdWN0SnNvbltcInUtOC8xMjhcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1widS04LzI1NlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1widS04LzI1NlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtOC8yNTZcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg4LzI1NiBHQikgJHtwcm9kdWN0SnNvbltcInUtOC8yNTZcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBwcm9kdWN0SnNvbltcInUtMTIvMTI4XCJdICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgcHJvZHVjdEpzb25bXCJ1LTEyLzEyOFwiXSAhPT0gXCJcIlxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS0xMi8xMjhcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgxMi8xMjgpIEdCICR7cHJvZHVjdEpzb25bXCJ1LTEyLzEyOFwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHByb2R1Y3RKc29uW1widS0xMi8yNTZcIl0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBwcm9kdWN0SnNvbltcInUtMTIvMjU2XCJdICE9PSBcIlwiXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCJ1LTEyLzI1NlwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDEyLzI1NikgR0IgJHtwcm9kdWN0SnNvbltcInUtMTIvMjU2XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgcHJvZHVjdEpzb25bXCJ1LTEyLzUxMlwiXSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHByb2R1Y3RKc29uW1widS0xMi81MTJcIl0gIT09IFwiXCJcclxuICAgICkge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtMTIvNTEyXCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoMTIvNTEyKSBHQiAke3Byb2R1Y3RKc29uW1widS0xMi81MTJcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBwcm9kdWN0SnNvbltcInUtMTIvMVRCXCJdICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgcHJvZHVjdEpzb25bXCJ1LTEyLzFUQlwiXSAhPT0gXCJcIlxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1widS0xMi8xVEJcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgxMkdCLzFUQikgJHtwcm9kdWN0SnNvbltcInUtMTIvMVRCXCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgcHJvZHVjdEpzb25bXCJ1LTE2LzUxMlwiXSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHByb2R1Y3RKc29uW1widS0xNi81MTJcIl0gIT09IFwiXCJcclxuICAgICkge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtMTYvNTEyXCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoMTYvNTEyKSBHQiAke3Byb2R1Y3RKc29uW1widS0xNi81MTJcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBwcm9kdWN0SnNvbltcInUtMThHQi81MTJcIl0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBwcm9kdWN0SnNvbltcInUtMThHQi81MTJcIl0gIT09IFwiXCJcclxuICAgICkge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcInUtMThHQi81MTJcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgxOEdCLzUxMikgR0IgJHtwcm9kdWN0SnNvbltcInUtMThHQi81MTJcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiMS84XCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCIxLzhcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCIxLzhcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgxLzgpIEdCICR7cHJvZHVjdEpzb25bXCIxLzhcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiMS8xNlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiMS8xNlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcIjEvMTZcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCgxLzE2KSBHQiAke3Byb2R1Y3RKc29uW1wiMS8xNlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdEpzb25bXCIyLzE2XCJdICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdEpzb25bXCIyLzE2XCJdICE9PSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IHByaWNlMTY6IFByb2R1Y3RQcmljZSA9IG5ldyBQcm9kdWN0UHJpY2UoKTtcclxuICAgICAgcHJpY2UxNi5wcmljZSA9IGVzR2V0TnVtYmVyKHByb2R1Y3RKc29uW1wiMi8xNlwiXSk7XHJcbiAgICAgIHByaWNlMTYudGl0bGUgPSBgKDIvMTYpIEdCICR7cHJvZHVjdEpzb25bXCIyLzE2XCJdfSBUS2A7XHJcbiAgICAgIHByaWNlMTYudHlwZSA9IGBPZmZpY2lhbGA7XHJcbiAgICAgIHByaWNlTGlzdC5wdXNoKHByaWNlMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0SnNvbltcIjMvMTZcIl0gIT09IHVuZGVmaW5lZCAmJiBwcm9kdWN0SnNvbltcIjMvMTZcIl0gIT09IFwiXCIpIHtcclxuICAgICAgY29uc3QgcHJpY2UxNjogUHJvZHVjdFByaWNlID0gbmV3IFByb2R1Y3RQcmljZSgpO1xyXG4gICAgICBwcmljZTE2LnByaWNlID0gZXNHZXROdW1iZXIocHJvZHVjdEpzb25bXCIzLzE2XCJdKTtcclxuICAgICAgcHJpY2UxNi50aXRsZSA9IGAoMy8xNikgR0IgJHtwcm9kdWN0SnNvbltcIjMvMTZcIl19IFRLYDtcclxuICAgICAgcHJpY2UxNi50eXBlID0gYE9mZmljaWFsYDtcclxuICAgICAgcHJpY2VMaXN0LnB1c2gocHJpY2UxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RKc29uW1wiNC8zMlwiXSAhPT0gdW5kZWZpbmVkICYmIHByb2R1Y3RKc29uW1wiNC8zMlwiXSAhPT0gXCJcIikge1xyXG4gICAgICBjb25zdCBwcmljZTE2OiBQcm9kdWN0UHJpY2UgPSBuZXcgUHJvZHVjdFByaWNlKCk7XHJcbiAgICAgIHByaWNlMTYucHJpY2UgPSBlc0dldE51bWJlcihwcm9kdWN0SnNvbltcIjQvMzJcIl0pO1xyXG4gICAgICBwcmljZTE2LnRpdGxlID0gYCg0LzMyKSBHQiAke3Byb2R1Y3RKc29uW1wiNC8zMlwiXX0gVEtgO1xyXG4gICAgICBwcmljZTE2LnR5cGUgPSBgT2ZmaWNpYWxgO1xyXG4gICAgICBwcmljZUxpc3QucHVzaChwcmljZTE2KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJpY2VMaXN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBtYXBTcGVjaWZpY2F0aW9uKFxyXG4gICAgcHJvZHVjdEpzb246IGFueSxcclxuICAgIHNwZWNUeXBlOiBTcGVjaWZpY2F0aW9uVHlwZSxcclxuICAgIHN0cktleTogc3RyaW5nLFxyXG4gICAga2V5SWQ6IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3Qgc3BlYzogU3BlY2lmaWNhdGlvbiA9IG5ldyBTcGVjaWZpY2F0aW9uKCk7XHJcbiAgICBzcGVjLmRlc2NyaXB0aW9uID0gcHJvZHVjdEpzb25bc3RyS2V5XTtcclxuICAgIHNwZWMudmFsdWUgPSBwcm9kdWN0SnNvbltzdHJLZXldO1xyXG5cclxuICAgIGNvbnN0IHNwZWNUZWNLZXkgPSBhd2FpdCBzcGVjS2V5U2VydmljZS5nZXRCeUlkKGtleUlkKTtcclxuICAgIGlmIChzcGVjVGVjS2V5ICE9PSB1bmRlZmluZWQgJiYgc3BlY1RlY0tleSAhPT0gbnVsbCkge1xyXG4gICAgICBzcGVjLmtleSA9IHNwZWNUZWNLZXk7XHJcbiAgICAgIHJldHVybiBzcGVjO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByb2R1Y3RNYXBwZXIgPSBuZXcgUHJvZHVjdE1hcHBlcigpO1xyXG4iXX0=