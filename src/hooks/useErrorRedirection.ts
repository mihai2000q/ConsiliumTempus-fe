import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/store.ts";
import { useEffect } from "react";
import { setErrorPath } from "../state/global/globalSlice.ts";

export default function useErrorRedirection() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const errorPath = useAppSelector(state => state.global.errorPath)
  useEffect(() => {
    if (errorPath) {
      navigate(errorPath)
      dispatch(setErrorPath(undefined))
    }
  }, [dispatch, errorPath, navigate])
}