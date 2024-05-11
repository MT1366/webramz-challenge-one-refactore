import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/user";
import TypeOfFormData from "../types/FormDataType";
import { Input, ColorPicker } from "antd";
import { updateColor } from "../services/posts";
import { useState } from "react";

function ColorPickerComponent() {
  const queryClient = useQueryClient();
  const [color, setColor] = useState("");

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const colorMutation = useMutation({
    mutationFn: updateColor,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", {}], data);
    },
  });

  const handleColorChange = (color: string, hex: string) => {
    setColor(hex);
    colorMutation.mutate(color);
  };

  return (
    <>
      {data &&
        data.map((d: TypeOfFormData) => (
          <div className="flex gap-5 items-center flex-col" key={d.formData.id}>
            {d.formData.dates.map((date: Date, index: any) => (
              <div className="flex flex-row justify-center items-center">
                <h2>{date.toString()}</h2>
                <Input
                  key={index}
                  placeholder="insert your number"
                  className="w-36 m-2"
                />
                <ColorPicker
                  onChange={(color, hex) => handleColorChange(hex, color)}
                />
              </div>
            ))}
          </div>
        ))}
    </>
  );
}

export default ColorPickerComponent;
