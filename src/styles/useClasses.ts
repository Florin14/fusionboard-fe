import { useMemo } from "react";
import { useTheme, Theme } from "@mui/material/styles";

type StylesFn<S> = (theme: Theme) => S;

export function useClasses<S>(stylesFn: StylesFn<S>, _options?: { name?: string }): S {
  const theme = useTheme();

  const classes = useMemo(() => stylesFn(theme), [stylesFn, theme]);

  return classes;
}
