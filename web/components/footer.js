import { CMS_NAME } from "../lib/constants";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            {CMS_NAME} er tilknyttet{" "}
            <strong>International Tress Association</strong>.
          </h3>
        </div>
      </Container>
    </footer>
  );
}
