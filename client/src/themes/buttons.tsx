import { Button } from "antd";

export const PrimaryButton = ({
  onClick,
  children,
}: {
  children: any;
  onClick?: (e: any) => void;
}) => {
  return (
    <>
      <Button
        style={{
          width: "100%",
        }}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};
