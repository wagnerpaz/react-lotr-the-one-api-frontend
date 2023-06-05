import { ComponentProps } from "react";
import Head from "next/head";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import Movies from "@/components/Movies";
import Characters from "@/components/Characters";

export default function Home() {
  const StyledTab: React.FC<ComponentProps<typeof Tab>> = ({ children }) => (
    <Tab
      className={({ selected }) =>
        classNames("outline-none transition-all hover:opacity-100", {
          "opacity-50": !selected,
          "scale-125 !text-hero": selected,
        })
      }
    >
      {children}
    </Tab>
  );

  return (
    <>
      <Head>
        <title>TOTR - The One API</title>
        <meta
          name="description"
          content="An implementation of The One API using Next.js / React / Tailwind CSSS"
        />
      </Head>
      <header className="bg-dark flex flex-col items-center justify-center h-[--header-height] p-4">
        <Image
          src="/the-lord-of-the-rings.webp"
          alt="The Lord Of The Rings - title"
          width={500}
          height={113}
        />
        <h2 className="font-ring-bearer text-hero">The One API</h2>
      </header>
      <Tab.Group as="nav">
        <Tab.List className="font-ring-bearer flex flex-row items-center justify-center gap-6 shadow-md shadow-black text-dark-a11y-high h-[--main-menu-height]">
          <StyledTab>movies</StyledTab>
          <div>•</div>
          <StyledTab>characters</StyledTab>
          <div>•</div>
          <StyledTab>quotes</StyledTab>
        </Tab.List>
        <Tab.Panels className="w-screen min-h-[calc(100vh-var(--header-height)-var(--footer-height)-var(--main-menu-height))] container mx-auto text-dark-a11y-high py-2 flex">
          <Tab.Panel className="flex-1">
            <Movies />
          </Tab.Panel>
          <Tab.Panel className="flex-1">
            <Characters />
          </Tab.Panel>
          <Tab.Panel className="flex-1">Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <footer className="bg-dark text-dark-a11y-high flex flex-col items-center justify-center h-[--footer-height] p-4">
        <div>Created by Wagner Paz</div>
        <div>Using Next.js / React / Tailwind CSS</div>
      </footer>
    </>
  );
}
