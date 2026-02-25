import { PowerCard, QuizQuestion } from "@/types";

export const POWER_CARDS: PowerCard[] = [
  {
    key: "yokai",
    name: "Yokai",
    emoji: "👻",
    description:
      "Esprit farceur et imprévisible, le chaos est ton terrain de jeu ! Personne ne sait jamais ce que tu prépares.",
    power:
      "Intervertissez les places de deux joueurs : vous-même et un adversaire, ou deux adversaires entre eux.",
    color: "#8B5CF6",
    bgColor: "#1E1040",
  },
  {
    key: "okami",
    name: "Okami",
    emoji: "🐺",
    description:
      "Loup rusé et manipulateur, tu tires les ficelles dans l'ombre. Personne ne sait ce que tu manigances… sauf toi.",
    power:
      "Échangez une carte entre deux joueurs, à l'aveugle.",
    color: "#3B82F6",
    bgColor: "#0F1A3D",
  },
  {
    key: "geisha",
    name: "Geisha",
    emoji: "🎭",
    description:
      "Stratège subtile et redoutable, tu avances tes pions avec grâce. Tes adversaires ne te voient jamais venir.",
    power:
      "Échangez une carte de votre jeu avec celle d'un adversaire, à l'aveugle.",
    color: "#EC4899",
    bgColor: "#3D0F2A",
  },
  {
    key: "samourai_noir",
    name: "Samouraï Noir",
    emoji: "⚔️",
    description:
      "Guerrier calculateur, tu frappes en connaissance de cause. Chaque mouvement est pesé, chaque action est décisive.",
    power:
      "Regardez la carte d'un adversaire et échangez-la avec une des vôtres, à l'aveugle, si vous le souhaitez.",
    color: "#6B7280",
    bgColor: "#1A1A2E",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Dans une partie de jeu de société, tu es plutôt…",
    answers: [
      {
        text: "Celui qui bluff et embrouille tout le monde 🃏",
        scores: { yokai: 3, geisha: 1 },
      },
      {
        text: "Celui qui observe et attend le bon moment 🎯",
        scores: { okami: 3, samourai_noir: 1 },
      },
      {
        text: "Celui qui négocie et fait des alliances 🤝",
        scores: { geisha: 3, yokai: 1 },
      },
      {
        text: "Celui qui fonce et attaque en premier ⚡",
        scores: { samourai_noir: 3, okami: 1 },
      },
    ],
  },
  {
    question: "Ton super-pouvoir rêvé ?",
    answers: [
      {
        text: "Invisibilité — disparaître quand ça m'arrange 👻",
        scores: { yokai: 2, okami: 2 },
      },
      {
        text: "Lire dans les pensées — toujours un coup d'avance 🧠",
        scores: { okami: 3, samourai_noir: 1 },
      },
      {
        text: "Charme irrésistible — tout le monde m'écoute ✨",
        scores: { geisha: 3, yokai: 1 },
      },
      {
        text: "Force surhumaine — rien ne m'arrête 💪",
        scores: { samourai_noir: 3, geisha: 1 },
      },
    ],
  },
  {
    question: "Face à un adversaire redoutable, ta stratégie c'est…",
    answers: [
      {
        text: "Le piéger avec une ruse inattendue 🪤",
        scores: { yokai: 3, okami: 1 },
      },
      {
        text: "L'étudier et exploiter sa faiblesse 🔍",
        scores: { okami: 3, samourai_noir: 1 },
      },
      {
        text: "Retourner ses alliés contre lui 💬",
        scores: { geisha: 3, yokai: 1 },
      },
      {
        text: "L'affronter de face, sans détour 🗡️",
        scores: { samourai_noir: 3, yokai: 1 },
      },
    ],
  },
  {
    question: "Quel personnage de fiction te ressemble le plus ?",
    answers: [
      {
        text: "Le Joker — imprévisible et génial 🎪",
        scores: { yokai: 3, okami: 1 },
      },
      {
        text: "Batman — stratège dans l'ombre 🦇",
        scores: { samourai_noir: 3, okami: 1 },
      },
      {
        text: "Cersei Lannister — le pouvoir par l'influence 👑",
        scores: { geisha: 3, okami: 1 },
      },
      {
        text: "Naruto — fonce avec le cœur ! 🍥",
        scores: { yokai: 2, samourai_noir: 2 },
      },
    ],
  },
];
