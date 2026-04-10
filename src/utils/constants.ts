type Language = {
  label: string;
  value: string;
};
type User = {
  id: string;
  name: string;
  age: number;
  city: string;
};
export const languages: Language[] = [
  { label: 'English', value: 'en' },
  { label: 'Marathi', value: 'mr' },
  { label: 'Hindi', value: 'hr' },
  { label: 'Gujarati', value: 'gu' },
  { label: 'Bhojpuri', value: 'bho' },
];

export const companyTypes = [
  { label: 'Private Limited', value: 'pvt' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Proprietorship', value: 'prop' },
];

export const states = [
  { label: 'Maharashtra', value: 'mh' },
  { label: 'Gujarat', value: 'gj' },
];

export const designations = [
  { label: 'manager', value: 'manager' },
  { label: 'superviser', value: 'superviser' },
  { label: 'accounts', value: 'accounts' },
];

export const vehicles = [
  { id: '1', number: 'ME46F5158', status: 'pending' },
  { id: '2', number: 'MO46F5158', status: 'verified' },
  { id: '3', number: 'UP46F5158', status: 'verified' },
  { id: '4', number: 'MPS46F5158', status: 'verified' },
];

export const truckBodyTypes = [
  { label: 'Flatbed', value: 'flatbed' },
  { label: 'Box Truck', value: 'box_truck' },
  { label: 'Refrigerated (Reefer)', value: 'reefer' },
  { label: 'Tanker', value: 'tanker' },
  { label: 'Tipper / Dump Truck', value: 'tipper' },
  { label: 'Container Truck', value: 'container_truck' },
  { label: 'Car Carrier', value: 'car_carrier' },
  { label: 'Curtain Side', value: 'curtain_side' },
  { label: 'Low Bed Trailer', value: 'low_bed_trailer' },
  { label: 'High Bed', value: 'high_bed' },
  { label: 'Open Body', value: 'open_body' },
  { label: 'Closed Body', value: 'closed_body' },
];

export const verifiedvehicles = [
  {
    id: '1',
    number: 'MO46F5158',
    bodytype: 'Close With Tarpoline',
    weight: '100',
    segment: 'ABC',
    length: '10',
    width: '20',
    height: '30',
    image1: 'https://via.placeholder.com/150',
    image2: 'https://via.placeholder.com/150',
    image3: 'https://via.placeholder.com/150',
    image4: 'https://via.placeholder.com/150',
    status: 'verified',
  },
  {
    id: '2',
    number: 'UP46F5158',
    bodytype: 'Open Truck',
    weight: '200',
    segment: 'Medium',
    length: '12',
    width: '22',
    height: '32',
    image1: 'https://via.placeholder.com/150',
    image2: 'https://via.placeholder.com/150',
    image3: 'https://via.placeholder.com/150',
    image4: 'https://via.placeholder.com/150',
    status: 'verified',
  },
  {
    id: '3',
    number: 'MP46F5158',
    bodytype: 'Container',
    weight: '300',
    segment: 'Heavy',
    length: '14',
    width: '24',
    height: '34',
    image1: 'https://via.placeholder.com/150',
    image2: 'https://via.placeholder.com/150',
    image3: 'https://via.placeholder.com/150',
    image4: 'https://via.placeholder.com/150',
    status: 'verified',
  },
];

export const columns = [
  { key: 'name', title: 'Name', flex: 2, minWidth: 120 },
  { key: 'age', title: 'Age', flex: 1, minWidth: 80 },
  { key: 'city', title: 'City', flex: 2, minWidth: 120 },
];

export const licensedata: User[] = [
  { id: '1', name: 'Abhishek', age: 25, city: 'Mumbai' },
  { id: '2', name: 'Rahul', age: 28, city: 'Delhi' },
];

export const bankOptions = [
  { label: 'State Bank of India', value: 'SBI', ifsc: 'SBIN' },
  { label: 'HDFC Bank', value: 'HDFC', ifsc: 'HDFC' },
  { label: 'ICICI Bank', value: 'ICICI', ifsc: 'ICIC' },
  { label: 'Axis Bank', value: 'AXIS', ifsc: 'UTIB' },
  { label: 'Punjab National Bank', value: 'PNB', ifsc: 'PUNB' },
  { label: 'Bank of Baroda', value: 'BOB', ifsc: 'BARB' },
  { label: 'Canara Bank', value: 'CANARA', ifsc: 'CNRB' },
  { label: 'Union Bank of India', value: 'UBI', ifsc: 'UBIN' },
  { label: 'Bank of India', value: 'BOI', ifsc: 'BKID' },
  { label: 'Indian Bank', value: 'INDIAN', ifsc: 'IDIB' },
  { label: 'Central Bank of India', value: 'CBI', ifsc: 'CBIN' },
  { label: 'UCO Bank', value: 'UCO', ifsc: 'UCBA' },
  { label: 'Punjab & Sind Bank', value: 'PSB', ifsc: 'PSIB' },
  { label: 'IDBI Bank', value: 'IDBI', ifsc: 'IBKL' },
  { label: 'Kotak Mahindra Bank', value: 'KOTAK', ifsc: 'KKBK' },
  { label: 'IndusInd Bank', value: 'INDUSIND', ifsc: 'INDB' },
  { label: 'Yes Bank', value: 'YES', ifsc: 'YESB' },
  { label: 'Federal Bank', value: 'FEDERAL', ifsc: 'FDRL' },
  { label: 'South Indian Bank', value: 'SIB', ifsc: 'SIBL' },
  { label: 'RBL Bank', value: 'RBL', ifsc: 'RATN' },
  { label: 'Bandhan Bank', value: 'BANDHAN', ifsc: 'BDBL' },
  { label: 'IDFC FIRST Bank', value: 'IDFC', ifsc: 'IDFB' },
  { label: 'AU Small Finance Bank', value: 'AU', ifsc: 'AUBL' },
  { label: 'Equitas Small Finance Bank', value: 'EQUITAS', ifsc: 'ESFB' },
  { label: 'Ujjivan Small Finance Bank', value: 'UJJIVAN', ifsc: 'UJVN' },
  { label: 'Jana Small Finance Bank', value: 'JANA', ifsc: 'JSFB' },
  { label: 'Suryoday Small Finance Bank', value: 'SURYODAY', ifsc: 'SURY' },
  { label: 'Fincare Small Finance Bank', value: 'FINCARE', ifsc: 'FSFB' },
  { label: 'DCB Bank', value: 'DCB', ifsc: 'DCBL' },
  { label: 'Karur Vysya Bank', value: 'KVB', ifsc: 'KVBL' },
  { label: 'Tamilnad Mercantile Bank', value: 'TMB', ifsc: 'TMBL' },
  { label: 'Nainital Bank', value: 'NAINITAL', ifsc: 'NTBL' },
];
