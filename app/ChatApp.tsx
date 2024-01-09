"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "react-markdown";

import { NextAI } from "@/components/card/NextAI";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import {
  ArrowDown,
  RefreshCcw,
  RefreshCcwDot,
  Send,
  Square,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const ChatApp = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    stop,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
    onError: () => {
      toast.error("Too many requests. Maximum 5 every 10 minutes.");
    },
  });
  const [autoScroll, setAutoScroll] = useState(true);
  const ulRef = useRef<HTMLUListElement>(null);

  const isEmptyMessages = messages.length === 0;

  // Pas recommandé
  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;
    if (!autoScroll) return;

    const { scrollHeight, clientHeight } = ul;

    ul.scrollTop = scrollHeight - clientHeight;
  }, [autoScroll, messages]);

  useEffect(() => {
    // add event listener to scroll of ulRef if defined

    const ul = ulRef.current;

    if (!ul) return;

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = ul;

      if (scrollHeight - clientHeight - scrollTop <= 1) {
        setAutoScroll(true);
      } else {
        setAutoScroll(false);
      }
    };

    ul.addEventListener("scroll", handleScroll);

    return () => {
      ul.removeEventListener("scroll", handleScroll);
    };
  }, [messages.length]);

  return (
    <div className="h-full flex flex-col justify-center gap-4">
      <header className="flex items-center gap-2">
        <Image
          src="/images/nextjs.png"
          width={32}
          height={32}
          alt="next.js logo"
          className={cn({
            "w-12 h-12": isEmptyMessages,
          })}
        />
        <h1
          className={cn("text-lg font-bold", {
            "text-2xl": isEmptyMessages,
          })}
        >
          Talk with Next.js doc
        </h1>
      </header>
      {isEmptyMessages ? (
        <NextAI />
      ) : (
        <ul className="flex-1 overflow-auto flex flex-col gap-2" ref={ulRef}>
          {messages.map((m, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row space-y-0 items-center gap-2 p-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>
                    {m.role === "user" ? "U" : "A"}
                  </AvatarFallback>
                  {m.role !== "user" ? (
                    <AvatarImage src="/images/nextjs.png" />
                  ) : null}
                </Avatar>
                <CardTitle>{m.role === "user" ? "User" : "AI"}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <Markdown className="prose">{m.content}</Markdown>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}

      {messages.length >= 1 ? (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            disabled={isLoading}
            onClick={() => {
              setMessages([]);
              stop();
            }}
          >
            <RefreshCcwDot size={16} className="mr-2" />
            Reset
          </Button>
          <Button size="sm" disabled={isLoading} onClick={() => reload()}>
            <RefreshCcw size={16} className="mr-2" />
            Reload
          </Button>
          <Button size="sm" disabled={!isLoading} onClick={() => stop()}>
            <Square size={16} className="mr-2" />
            Stop
          </Button>
          {!autoScroll ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAutoScroll(true);
              }}
            >
              <ArrowDown size={16} className="mr-2" />
              Scroll
            </Button>
          ) : null}
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="flex items-end gap-2"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here."
            id="message"
          />
        </div>
        <Button size="sm" type="submit">
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};
