import { useEffect } from "react";
import {
  studentSelectors,
  fetchProductsAsync,
  fetchFilters,
} from "../people/students/MnStudentsSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

export default function useStudent() {
  const students = useAppSelector(studentSelectors.selectAll);
  const { productsLoaded, filtersLoaded, title, status, metaData } =
    useAppSelector((state) => state.MnStudent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  return {
    students,
    productsLoaded,
    filtersLoaded,
    title,
    status,
    metaData,
  };
}
