export interface Metadata {
  id: string;

  type: string;

  value: string;

  description: string;
}

export interface CreateMetadataRequest {
  type: string;

  value: string;

  description: string;
}

export interface UpdateMetadataRequest {
  type: string;

  value: string;

  description: string;
}