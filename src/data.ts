export type TapeColor = "pink" | "yellow" | "blue" | "orange";

export type ScrapbookPhoto = {
  image: string;
  label: string;
  rotate: number;
  tape: TapeColor;
};

export const siteData = {
  personName: "YOUR NAME",
  senderName: "YOUR PERSON",
  birthdayMonth: "SEPTEMBER",
  birthdayDay: "28",
  birthdayYear: "2026",

    music: {
    enabled: true,
    videoId: "L16f7Jve-T4",
    title: "birthday song",
},

  cover: {
    kicker: "A LITTLE SOMETHING FOR YOU",
    titleLineOne: "birthday",
    titleHighlight: "scrapbook",
    titleLineThree: "♡",
    subtitle:
      "photos, little notes, memories, and all the things that deserve a tiny place in your scrapbook.",
    stickerOne: "HAPPY BDAY!",
    stickerTwo: "made with love",
    photoCaption: "one of my favorite people",
  },

  hello: {
    label: "01 / OPEN ME",
    titleLineOne: "okay, so...",
    titleHighlight: "it's your birthday!",
    intro: "and obviously, one little message wasn't going to be enough.",
    paragraphs: [
      "So I made you this tiny digital scrapbook instead — because some people deserve more than just a quick birthday greeting.",
      "There are photos, random little memories, things I hope you remember, and a few wishes for the year ahead.",
    ],
    note: "keep scrolling, birthday person ♡",
  },

  memories: [
    {
      image: "/photos/photo-03.jpg",
      number: "01",
      title: "one of the good ones",
      text: "A little moment that deserves to stay here forever.",
      tape: "pink" as TapeColor,
      rotate: -3,
    },
    {
      image: "/photos/photo-04.jpg",
      number: "02",
      title: "that day",
      text: "Proof that even ordinary days can become favorite memories.",
      tape: "yellow" as TapeColor,
      rotate: 3,
    },
    {
      image: "/photos/photo-05.jpg",
      number: "03",
      title: "keeping this one",
      text: "Because this photo just feels like something worth remembering.",
      tape: "blue" as TapeColor,
      rotate: -2,
    },
    {
      image: "/photos/photo-06.jpg",
      number: "04",
      title: "another favorite",
      text: "Adding this one to the little collection of moments I never want to forget.",
      tape: "orange" as TapeColor,
      rotate: 2,
    },
  ],

  notes: {
    label: "03 / LITTLE NOTES",
    titleLineOne: "things i hope",
    titleHighlight: "you remember.",
    intro:
      "Just a few little reminders for the days when you might need them.",
    photo: "/photos/photo-07.jpg",
    cards: [
      {
        number: "01",
        title: "you are loved.",
        text: "More than you probably realize.",
        color: "pink",
        doodle: "♡",
      },
      {
        number: "02",
        title: "small progress counts.",
        text: "You don't have to figure everything out at once.",
        color: "yellow",
        doodle: "✦",
      },
      {
        number: "03",
        title: "good things are coming.",
        text: "Keep going. Your story isn't finished yet.",
        color: "blue",
        doodle: "✿",
      },
    ],
  },

  video: {
    label: "04 / MOVING MEMORIES",
    titleLineOne: "some memories",
    titleHighlight: "move.",
    subtitle:
      "A little video break because photos don't always tell the whole story.",
    videoFile: "/videos/couple-video.mp4",
    sticker: "PLAY THIS ♡",
  },

  photos: {
    label: "05 / PHOTO DUMP",
    titleLineOne: "the birthday",
    titleHighlight: "photo pile.",
    subtitle:
      "No particular order. Just some of the good stuff.",
    photos: [
      {
        image: "/photos/photo-08.jpg",
        label: "favorite",
        rotate: -5,
        tape: "pink" as TapeColor,
      },
      {
        image: "/photos/photo-09.jpg",
        label: "♡",
        rotate: 4,
        tape: "yellow" as TapeColor,
      },
      {
        image: "/photos/photo-10.jpg",
        label: "keep this one",
        rotate: -2,
        tape: "blue" as TapeColor,
      },
    ] as ScrapbookPhoto[],
  },

  letter: {
    label: "06 / ONE LAST NOTE",
    sideNote: "written especially for you",
    greeting: "dear you,",
    paragraphs: [
      "Happy birthday to one of the people who makes ordinary days a little more special.",
      "I hope you know that the little things about you matter. The way you laugh, the random things you say, the memories we accidentally make — all of them are worth keeping.",
      "I hope this next year brings you closer to the things you want, gives you plenty of reasons to smile, and gives you moments you'll want to remember forever.",
      "Keep being you. Keep making memories. And please leave a little room for all the good things that are still on their way.",
    ],
    endingLineOne: "happy birthday,",
    endingLineTwo: "always ♡",
  },

  ending: {
    smallText: "AND THAT'S A WRAP...",
    titleLineOne: "here's to",
    titleHighlight: "another year",
    titleLineThree: "of you ♡",
    message:
      "May this year be full of good people, loud laughs, soft moments, and memories worth keeping.",
    stickerOne: "LOVE YOU!",
    stickerTwo: "THE END",
  },
};