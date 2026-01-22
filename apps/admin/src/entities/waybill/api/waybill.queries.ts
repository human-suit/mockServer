import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { waybillApi } from "../store/waybill.store";
import { WaybillStatus } from "../types/types";

export const WAYBILLS_QUERY_KEY = ["waybills"];

/* ---------- GET ---------- */
export const useWaybills = () =>
  useQuery({
    queryKey: WAYBILLS_QUERY_KEY,
    queryFn: waybillApi.getAll,
  });

/* ---------- CREATE ---------- */
export const useCreateWaybill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: waybillApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAYBILLS_QUERY_KEY });
    },
  });
};

/* ---------- UPDATE ---------- */
export const useUpdateWaybill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { number: string; status: WaybillStatus };
    }) => waybillApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAYBILLS_QUERY_KEY });
    },
  });
};

/* ---------- DELETE ---------- */
export const useDeleteWaybill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: waybillApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAYBILLS_QUERY_KEY });
    },
  });
};
