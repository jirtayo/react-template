import { create, useModal, show } from "@ebay/nice-modal-react";
import { Image } from "antd";

export const ImagePreview = create((props) => {
  const modal = useModal();
  console.log(modal, props);
  return (
    <Image
      preview={{
        visible: modal.visible,
        src: props.imageUrl,
        onVisibleChange: async (value) => {
          if (!value) await modal.hide();
        },
      }}
    />
  );
});

const staticMethods = {
  show(props) {
    if (typeof props === "string") {
      props = { imageUrl: props };
    }
    return show(ImagePreview, props);
  },
};

Object.assign(ImagePreview, staticMethods);
