"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AudioLines,
  Calendar,
  Dot,
  Facebook,
  Info,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const handlePlay = () => {
      setIsPlaying(true);
      controls.start({ scale: 1.1, transition: { duration: 0.2 } });
    };

    const handlePause = () => {
      setIsPlaying(false);
      controls.start({ scale: 1, transition: { duration: 0.2 } });
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      }
    };

    attemptAutoplay();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [controls]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
      setIsPlaying(false);
    }
  };

  interface ProgressBarClickEvent extends React.MouseEvent<HTMLDivElement> {
    currentTarget: HTMLDivElement;
  }

  const handleProgressBarClick = (e: ProgressBarClickEvent) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = (currentTime / duration) * 100 || 0;

  const cardVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.02,
      rotate: 0.5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <audio ref={audioRef} src="/music.mp3" preload="metadata" />
      <div className="flex justify-center items-center w-full h-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
            className="px-4 sm:px-6 lg:px-8 py-5 md:py-0"
          >
            <Card className="max-w-md mx-auto w-full border-border/30 shadow-sm">
              <div className="relative p-0">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Image
                    src="/profile-banner.gif"
                    alt="Profile Banner"
                    width={1000}
                    height={500}
                    className="h-36 object-cover shadow-sm rounded-lg"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
                <Avatar className="size-24 !-mt-10 ml-3 ring-4 ring-card">
                  <AvatarImage src="/โปรเจ็กต์ใหม่ 389 [B744C57].png" alt="Profile Avatar" />
                </Avatar>
                <div className="-mt-10 ml-28 mb-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <Badge variant="secondary" className="max-w-full whitespace-nowrap">
                      ง่วงง
                    </Badge>
                  </motion.div>
                </div>
              </div>
              <div className="-mt-2 p-4 md:p-5 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <div>
                      <h1 className="text-xl font-semibold">Thirawat</h1>
                      <p className="text-sm font-medium text-muted-foreground flex items-center">
                        Thirawat <Dot className="size-4" />  / Pooh
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-x-2">
                      <Button variant="secondary" size="icon" asChild>
                        <Link
                          href="https://www.facebook.com/ma.kumpha"
                          target="_blank"
                        >
                          <Facebook />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-2 md:p-3 space-y-1.5">
                      <p className="text-xs font-semibold text-muted-foreground flex items-center gap-x-2">
                        <Info className="size-3" />
                        เกี่ยวกับฉัน
                      </p>
                      <p className="text-sm font-medium">
                        &quot; อย่าหยุดค้นคว้าหากยังไม่ประสบความสำเร็จ... &quot;
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-2 md:p-3 space-y-1.5">
                      <p className="text-xs font-semibold text-muted-foreground flex items-center gap-x-2">
                        <Calendar className="size-3" />
                        เป็นประชากรบนโลกตั้งแต่
                      </p>
                      <p className="text-sm font-medium">16 กันยายน 2551</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-2 md:p-3 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground flex items-center gap-x-2">
                        <AudioLines className="size-3" />
                        กําลังฟังเพลง
                      </p>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src="/music-thumbnail.jpg"
                            alt="Music Thumbnail"
                            width={1000}
                            height={1000}
                            className="rounded-md w-20"
                          />

                          <div className="flex flex-col">
                            <p className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text font-bold text-sm">
                              1MILL
                            </p>
                            <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-lg font-extrabold">
                              SATURDAY
                            </h1>
                            <span className="text-muted-foreground text-xs font-medium">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          animate={controls}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={togglePlayPause}
                        >
                          <Button variant="ghost" size="icon">
                            {isPlaying ? <PauseCircle /> : <PlayCircle />}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                    <div
                      className="flex w-full h-1.5 bg-muted rounded-b-full overflow-hidden cursor-pointer"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      onClick={handleProgressBarClick}
                    >
                      <motion.div
                        className="flex flex-col justify-center rounded-r-full overflow-hidden bg-gradient-to-r from-[#43e97b] to-[#38f9d7] text-xs text-white text-center whitespace-nowrap"
                        style={{ width: `${progress}%` }}
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${progress}%`,
                          transition: {
                            duration: 0.2,
                            ease: "linear",
                          },
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
