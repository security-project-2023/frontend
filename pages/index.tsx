import styled from "styled-components";
import Banner from "./components/Banner";
import Link from "next/link";

export default function Index() {
  const contentList = [
    {
      thumbnail: "/images/banner/poster1.png",
      title: "뮤지컬 <레미제라블>",
      place: "블루스퀘어 신한카드홀",
      date: "2023.11.30 ~ 2024.3.10",
    },
    {
      thumbnail: "/images/banner/poster2.png",
      title: "태양의 서커스 <루치아>",
      place: "블루스퀘어 신한카드홀",
      date: "2023.11.30 ~ 2024.3.10",
    },
    {
      thumbnail: "/images/banner/poster1.png",
      title: "뮤지컬 <레미제라블>",
      place: "블루스퀘어 신한카드홀",
      date: "2023.11.30 ~ 2024.3.10",
    },
    {
      thumbnail: "/images/banner/poster2.png",
      title: "태양의 서커스 <루치아>",
      place: "블루스퀘어 신한카드홀",
      date: "2023.11.30 ~ 2024.3.10",
    },
    {
      thumbnail: "/images/banner/poster1.png",
      title: "뮤지컬 <레미제라블>",
      place: "블루스퀘어 신한카드홀",
      date: "2023.11.30 ~ 2024.3.10",
    },
    {
      thumbnail: "/images/banner/poster2.png",
      title: "태양의 서커스 <루치아>",
      place: "블루스퀘어 신한카드홀",
      date: "2023.11.30 ~ 2024.3.10",
    },
  ];

  return (
    <>
      <Wrapper>
        <Banner />
        <Container>
          <CategoryTitleWrapper>
            <Link href={"/category/musical"}>뮤지컬</Link>
            <Icon src="/images/icons/right.svg" />
          </CategoryTitleWrapper>
          <Row>
            {contentList.map((content, index) => (
              <ContentWrapper key={index}>
                <Poster src={content.thumbnail} />
                <Detail>
                  <h1>{content.title}</h1>
                  <h2>{content.place}</h2>
                  <p>{content.date}</p>
                </Detail>
              </ContentWrapper>
            ))}
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CategoryTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  a {
    color: #000;
    font-size: 28px;
    font-weight: 600;
  }
`;

const Icon = styled.img`
  width: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Poster = styled.img`
  width: 200px;
  height: 260px;
  object-fit: cover;

  border-radius: 8px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  color: #000;
  letter-spacing: -0.56px;

  h1 {
    font-size: 20px;
    font-weight: 600;
  }

  h2 {
    color: #636363;
    font-size: 14px;
    font-weight: 500;
  }

  p {
    color: #b4b4b4;
    font-size: 14px;
    font-weight: 500;
  }
`;
