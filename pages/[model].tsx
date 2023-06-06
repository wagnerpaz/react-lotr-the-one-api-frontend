import { ComponentProps, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useRouter } from "next/router";

import Movies from "@/components/Movies";
import Characters from "@/components/Characters";
import Quotes from "@/components/Quotes";

export default function Home() {
  const router = useRouter();

  const defaultSelectedTabIndex =
    router.query.model === "movies"
      ? 0
      : router.query.model === "characters"
      ? 1
      : router.query.model === "quotes"
      ? 2
      : undefined;

  useEffect(() => {
    console.log("effect");
  }, []);

  const StyledTab: React.FC<ComponentProps<typeof Tab>> = ({
    children,
    ...props
  }) => (
    <Tab
      className={({ selected }) =>
        classNames("outline-none transition-all hover:opacity-100", {
          "opacity-50": !selected,
          "scale-125 !text-hero": selected,
        })
      }
      {...props}
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
          priority
        />
        <h2 className="font-ring-bearer text-hero">The One API</h2>
      </header>
      {defaultSelectedTabIndex !== undefined && (
        <Tab.Group as="nav" defaultIndex={defaultSelectedTabIndex}>
          <Tab.List className="font-ring-bearer flex flex-row items-center justify-center gap-6 shadow-md shadow-black text-dark-a11y-high h-[--main-menu-height]">
            <StyledTab
              onClick={() =>
                router.push("/movies", undefined, { shallow: true })
              }
            >
              movies
            </StyledTab>
            <div>•</div>
            <StyledTab
              onClick={() =>
                router.push("/characters", undefined, { shallow: true })
              }
            >
              characters
            </StyledTab>
            <div>•</div>
            <StyledTab
              onClick={() =>
                router.push("/quotes", undefined, { shallow: true })
              }
            >
              quotes
            </StyledTab>
          </Tab.List>
          <Tab.Panels className="w-screen min-h-[calc(100vh-var(--header-height)-var(--footer-height)-var(--main-menu-height))] container mx-auto text-dark-a11y-high py-2 flex">
            <Tab.Panel className="flex-1">
              <Movies />
            </Tab.Panel>
            <Tab.Panel className="flex-1">
              <Characters />
            </Tab.Panel>
            <Tab.Panel className="flex-1">
              <Quotes />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
      <footer className="bg-dark text-dark-a11y-high flex flex-col items-center justify-center h-[--footer-height] p-4">
        <div>Created by Wagner Paz</div>
        <div>Using Next.js / React / Tailwind CSS</div>
      </footer>
    </>
  );
}
