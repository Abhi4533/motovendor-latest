type Language = {
  label: string;
  value: string;
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
