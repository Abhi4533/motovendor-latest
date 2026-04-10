export type VehicleForm = {
  vendorId: string;
  vehicleno: string;
  vehicleDetails: {
    registrationNo: string;
    bodyType: string;
  };
  vehicleTypeDetails: {
    weight: string;
    vehicleType: string;
    height: string;
    width: string;
    length: string;
  };
  vehiclePhotos: {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
  };
};
