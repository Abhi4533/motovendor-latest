export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
};

export type DashboardState = {
  selectedModule: string | null;
  stats: {
    totalVehicles: number;
    totalDrivers: number;
    totalTrips: number;
    totalRevenue: number;
  };
};

export type RegistrationState = {
  currentStep: number;
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  };
  companyDetails: {
    companyName: string;
    gstNumber: string;
    panNumber: string;
    address: string;
  };
  completed: boolean;
};

export type VehicleFormState = {
  vehicleNumber: string;
  vehicleType: string;
  truckBodyType: string;
  capacity: string;
  rcFront: string;
  rcBack: string;
  insurance: string;
};

export type BankFormState = {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  cancelledCheque: string;
};
