"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Image } from "@nextui-org/react";

interface MsgItemProps {
    imgSrc: string
    isSender: number
}

export const ImgMsg: React.FC<MsgItemProps> = ({ imgSrc, isSender }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    function handleDownLoadClick() {
        window.open(`http://127.0.0.1:5000/api/img/${imgSrc}`)
    }
    return (
        <>
            {isSender === 1 ? (
                <Image onClick={onOpen} fallbackSrc="https://via.placeholder.com/200x200" src={`http://127.0.0.1:5000/api/img/${imgSrc}`} loading="lazy" isBlurred alt={imgSrc} width={300} />

            ) : (

                <Image onClick={onOpen} fallbackSrc="https://via.placeholder.com/200x200" src={`http://127.0.0.1:5000/api/img/${imgSrc}`} loading="lazy" isBlurred alt={imgSrc} width={300} />
            )}

            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Image</ModalHeader>
                            <ModalBody className="flex items-center justify-center">
                                <Image onClick={onOpen} fallbackSrc="https://via.placeholder.com/200x200" src={`http://127.0.0.1:5000/api/img/${imgSrc}`} isBlurred alt={imgSrc} width={500} />
                            </ModalBody>
                            <ModalFooter>

                                <Button color="primary" onPress={() => handleDownLoadClick()}>
                                    Download
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
