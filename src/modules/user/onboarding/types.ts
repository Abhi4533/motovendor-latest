type Authorities = {
  designation: string;
  fullname: string;
  mobileno: string;
  email: string;
};
type Vehicle = {
  registrationNumber: string;
  capacity: string;
};
type legaldocuments = {
  gstnumber: string;
  pannumber: string;
  numberofvehicles: number;
  vehicles: Vehicle[];
};

export type VendorFormValues = {
  companyName: string;
  companyType: string;
  ownerName: string;
  mobileNumber: string;
  building: string;
  area: string;
  pincode: string;
  state: string;
  district: string;
  town: string;
  Numberofauthrity: number;
  Authority: Authorities;
  legaldocuments: legaldocuments;
};
