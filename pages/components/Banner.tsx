import { useState } from "react";
import { styled } from "styled-components";

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const bannerList = [
    "/images/banner/1.png",
    "/images/banner/2.png",
    "/images/banner/1.png",
  ];

  return (
    <>
      <Wrapper>
        <Image src={bannerList[current]} alt="배너" />
        <Pagination>
          {bannerList.map((banner, index) => (
            <Page
              onClick={() => setCurrent(index)}
              key={index}
              selected={current === index}
            />
          ))}
        </Pagination>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 500px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: 0.2s ease-in-out;
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  gap: 8px;
`;

const Page = styled.div<{ selected?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ selected }) =>
    selected ? "#F90" : "rgba(255, 153, 0, 0.30)"};
  cursor: pointer;
`;
