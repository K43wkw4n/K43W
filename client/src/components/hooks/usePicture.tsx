import { useEffect } from "react";
import {
    pictureSelectors,
  fetchPicturesAsync
} from "../management/MnPictureSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

export default function usePicture() {
  const pictures = useAppSelector(pictureSelectors.selectAll);
  const { productsLoaded, filtersLoaded, title, status, metaData } =
    useAppSelector((state) => state.MnStudent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchPicturesAsync());
  }, [productsLoaded, dispatch]);

  return {
    pictures,
  };
}
