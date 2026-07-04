export type HealthStatus = 'Healthy' | 'Monitor' | 'Attention' | 'Critical';

export interface Part {
  id: string;
  name: string;
  category: string;
  qty: number;
  price: string;
  thumbnail: string;
  compatibilityCode: string;
  vendor: string;
}

export interface ServiceLog {
  date: string;
  action: string;
  technician: string;
  notes: string;
}

export interface Document {
  name: string;
  type: string;
  size: string;
}

export interface EquipmentNode {
  id: string;
  name: string;
  status: HealthStatus;
  model: string;
  specs: { label: string; value: string }[];
  installDate: string;
  installedBy: string;
  vendor: string;
  distributor: string;
  warranty: string;
  compatibleParts: Part[];
  serviceHistory: ServiceLog[];
  relatedAssets: string[];
  documents: Document[];
  alertMessage: string;
}

export interface InstallStepState {
  step: number;
  selectedAssetId: string;
  actionType: string;
  selectedPartId: string;
  quantity: number;
  vendor: string;
  distributor: string;
  isSaved: boolean;
}
