import { useRef } from "react";
import { useState } from "react";
import { Api } from "./api";
import {
  Button,
  ProgressCircle,
  Flex,
  View,
  Text,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
} from "@adobe/react-spectrum";
import Edit from "@spectrum-icons/workflow/Edit";
import { Label } from "./App";

export function FileUploader({
  onUploadSuccessful,
}: {
  onUploadSuccessful: () => void;
}) {
  const fileInput = useRef<any>();
  const closeRef = useRef<any>();
  const [isUploading, setIsUploading] = useState(false);

  const upload = async () => {
    const file = fileInput?.current?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await Api.upload(file);
    setIsUploading(false);
    closeRef?.current?.();
    onUploadSuccessful();
  };

  return (
    <View marginBottom="size-400">
      <DialogTrigger>
        <Button variant="cta">
          <Edit size="XS" />
          <Text>Edit</Text>
        </Button>
        {(close) => (
          <Dialog isDismissable>
            <Heading>Upload new deck</Heading>
            {(closeRef.current = close)}
            <Divider />
            {(closeRef.current = close)}
            <Content
              width="400px"
              height="60px"
              marginX="auto"
              marginY="size-400"
            >
              {isUploading ? (
                <Flex alignItems="center">
                  <ProgressCircle
                    aria-label="Loading…"
                    isIndeterminate
                    marginEnd="size-200"
                  />
                  <Text>Uploading... This may take a while...</Text>
                </Flex>
              ) : (
                <>
                  <Label>Upload a pdf file</Label>
                  <Flex alignItems="center">
                    <input
                      type="file"
                      accept="application/pdf"
                      ref={fileInput}
                    />
                    <Button
                      variant="cta"
                      onPress={upload}
                      isDisabled={isUploading}
                      marginStart="size-300"
                    >
                      Upload
                    </Button>
                  </Flex>
                </>
              )}
            </Content>
          </Dialog>
        )}
      </DialogTrigger>
    </View>
  );
}
