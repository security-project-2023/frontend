import { styled } from "styled-components";

type Props = {
  isOpen: boolean;
  closeHandler: () => void;
  children: React.ReactNode;
  zIndex?: number;
};

export default function ModalBase(props: Props) {
  return (
    <>
      {props.isOpen && (
        <>
          <Background
            onClick={props.closeHandler}
            style={{ zIndex: props.zIndex }}
          />
          <Wrapper style={{ zIndex: props.zIndex }}>{props.children}</Wrapper>
        </>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);

  position: fixed;
  top: 0;
  left: 0;
`;
