import Container from "../container";
import Header from "../header";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4"></div>
      </Container>
    </>
  );
};
export default Layout;
