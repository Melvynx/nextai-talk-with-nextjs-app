"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Typography } from "../ui/typography";

import type { MouseEventHandler } from "react";

export const findDegree = (
  element: HTMLDivElement,
  event: Parameters<MouseEventHandler<HTMLDivElement>>[0]
) => {
  const rect = element.getBoundingClientRect();

  const x = event.clientX - (rect.left + (rect.right - rect.left) / 2);
  const y = event.clientY - (rect.top + (rect.bottom - rect.top) / 2);

  const degreeRadian = Math.atan2(y, x);
  const degree = (degreeRadian * 180) / Math.PI + 180;

  element.style.setProperty("--gradient-rotation", `${degree + 77}deg`);
};

export type NextAIProps = {};

export const NextAI = (props: NextAIProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      findDegree(ref.current, event as never);
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="paddingBox p-4 opacity-60 hover:opacity-100 transition-opacity rounded-lg shadow"
      ref={ref}
    >
      <Typography variant="small" className="italic">
        This projet is sponsored by{""}
      </Typography>
      <Typography
        variant="large"
        as={Link}
        className="mt-2"
        href="https://codelynx.dev/nextai/courses?utm_campaign=react-chat-title"
      >
        NextAI
      </Typography>
      <Typography>
        The tranining courses where you will learn how to create your own AI
        applications.{" "}
        <Link
          href="https://codelynx.dev/nextai/courses?utm_campaign=react-chat-try-free"
          className="text-cyan-500 hover:underline"
        >
          Try the free course now. (in 🇫🇷)
        </Link>
      </Typography>
    </div>
  );
};
