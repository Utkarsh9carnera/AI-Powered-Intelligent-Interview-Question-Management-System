import api from "./api";

import type {
  Metadata,
  CreateMetadataRequest,
  UpdateMetadataRequest,
} from "../types/metadata";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const getMetadata = () =>
  api.get<ApiResponse<Metadata[]>>("/metadata");

const createMetadata = (
  data: CreateMetadataRequest
) =>
  api.post<ApiResponse<Metadata>>(
    "/metadata",
    data
  );

const updateMetadata = (
  id: string,
  data: UpdateMetadataRequest
) =>
  api.put<ApiResponse<Metadata>>(
    `/metadata/${id}`,
    data
  );

const deleteMetadata = (
  id: string
) =>
  api.delete<ApiResponse<object>>(
    `/metadata/${id}`
  );

export default {
  getMetadata,
  createMetadata,
  updateMetadata,
  deleteMetadata,
};