import type { WeddingConfig } from "../../types/wedding";
import { defaultWeddingTheme } from "../theme";

const asset = (file: string) => `/weddings/allyzza-kenneth/${file}`;

export const allyzzaKennethWedding: WeddingConfig = {
  id: "allyzza-kenneth",

  couple: {
    bride: "Allyzza",
    groom: "Kenneth",
    displayName: "Allyzza & Kenneth",
  },

  wedding: {
    date: "2027-05-04T14:30:00",
    timezone: "Asia/Manila",
    displayDate: "May 4, 2027",
  },

  theme: defaultWeddingTheme,

  hero: {
    image: asset("wedding.png"),
    familiesLine: "Together with their loving families & friends",
    inviteLine: "joyfully invite you to celebrate\ntheir wedding",
    openButtonLabel: "Open Invitation",
  },

  invitationMessage: `With joyful hearts and grateful spirits,
we invite you to celebrate with us
as we begin this beautiful journey together.

Your presence would mean so much to us
as we celebrate this special day
with the people we love.`,

  ceremony: {
    name: "Holy Family Parish",
    address: "Brgy. Kapitolyo, Pasig City",
    time: "2:30 PM",
    mapsUrl: "https://maps.app.goo.gl/sBiUju1uq68HcYQB6",
    image: asset("Wedding Ceremony.jpg"),
  },

  reception: {
    name: "Cafe Juanita",
    address: "Brgy. Kapitolyo, Pasig City",
    time: "5:00 PM",
    mapsUrl: "https://maps.app.goo.gl/vSsZdt7gWPCCsNyc7",
    image: asset("cafe_juanita-9.webp"),
  },

  entourage: {
    bridesParents: [
      { name: "Mrs. Luz N. Taller", role: "Mother of the Bride" },
      { name: "Mr. Ruben B. Taller", role: "Father of the Bride" },
    ],
    groomsParents: [
      { name: "Mrs. Vilma D. Garbe", role: "Mother of the Groom" },
      { name: "Mr. Felipe S. Garbe", role: "Father of the Groom" },
    ],
    principalSponsors: {
      ninong: [
        { name: "Mr. Rioben Abrio" },
        { name: "Mr. Garbe" },
        { name: "Mr. Jerali D. Rodrigo" },
        { name: "Mr. Juane B. Taller" },
      ],
      ninang: [
        { name: "Mrs. Donabel M. Arce" },
        { name: "Mrs. Henia G. Bernardo" },
        { name: "Mrs. Eva A. Dulfo" },
        { name: "Mrs. Maricel M. Lacap" },
      ],
    },
    secondarySponsors: {
      candle: [
        { name: "Ms. Jessa Mae Navarrosa" },
        { name: "Mr. Jeff Clifford Gatchalian" },
      ],
      veil: [
        { name: "Ms. MA. Angelica Bernal" },
        { name: "Mr. Kurt Jacinth Sario" },
      ],
      cord: [
        { name: "Ms. April Bonghanoy" },
        { name: "Mr. Jomarie Binas" },
      ],
    },
    bestMan: [{ name: "Mr. Ron Lemuel Aldave" }],
    maidOfHonor: [{ name: "Ms. Krisha Garbe" }, { name: "Ms. Michaela Taller" }],
    bridesSiblings: [
      { name: "Mr. James Ivan N. Taller" },
      { name: "Ms. Jennifer C. Alcantara" },
    ],
    groomsSiblings: [{ name: "Mr. Felipe D. Garbe Jr." }, { name: "Mrs. Glaeden Bianca Q. Garbe" }],
    ringBearer: [{ name: "Felipe Q. Garbe III" }],
    flowerGirls: [
      { name: "Olivia Faye A. Faller" },
      { name: "Elora Yvaine B. Casilao" },
    ],
  },

  attire: {
    principalSponsors: {
      gentlemen: "Barong Tagalog",
      ladies: "Formal Filipiniana / Long Formal Dress",
    },
    guests: {
      gentlemen: "Short/Long Sleeved Formal Attire",
      ladies: "Long Formal Dress",
    },
  },

  colors: [
    { name: "Beautiful Navy", hex: "#252a57" },
    { name: "Flat Dark Blue", hex: "#2f5284" },
    { name: "Kashmir Blue", hex: "#4b6c99" },
    { name: "Heather Blue", hex: "#6886ad" },
    { name: "Marlborough Blue", hex: "#84a0c1" },
  ],

  program: [
    {
      time: "3:00 PM",
      title: "Wedding Ceremony",
      description: "Exchange of vows at the parish.",
    },
    {
      time: "4:30 PM",
      title: "Photoshoot",
      description: "We will be having a photoshoot after the ceremony.",
    },
    {
      time: "5:30 PM",
      title: "Couple's Entrance",
      description: "Entrance of the newlyweds and welcome remarks.",
    },
    {
      time: "6:00 PM",
      title: "Dinner",
      description: "Shared meal with family and closest friends.",
    },
    {
      time: "7:00 PM",
      title: "First Dance, Messages, and Blessing",
      description: "Toasts, dances, and celebration.",
    },
    {
      time: "8:00 PM",
      title: "Send Off",
      description: "Send off of the newlyweds.",
    },
  ],

  gallery: [
    {
      src: "https://placehold.co/600x400",
      alt: "Placeholder portrait of Allyzza and Kenneth together",
      caption: "A quiet afternoon",
    },
    {
      src: "https://placehold.co/600x400",
      alt: "Placeholder portrait of Allyzza and Kenneth walking",
      caption: "Side by side",
    },
    {
      src: "https://placehold.co/600x400",
      alt: "Placeholder portrait of Allyzza and Kenneth at dusk",
      caption: "Golden hour",
    },
    {
      src: "https://placehold.co/600x400",
      alt: "Placeholder portrait of Allyzza and Kenneth smiling",
      caption: "The beginning",
    },
  ],

  gifts: [
    {
      id: "gcash",
      name: "GCash",
      accountName: "A. Santos (Placeholder)",
      accountNumber: "09XX XXX XXXX",
      qrCode: asset("qr-gcash.svg"),
      instructions: "Demo only — not a real account.",
    },
    {
      id: "maribank",
      name: "MariBank",
      accountName: "K. Reyes (Placeholder)",
      accountNumber: "XXXX XXXX XXXX",
      qrCode: asset("qr-maribank.svg"),
      instructions: "Demo only — not a real account.",
    },
  ],

  rsvp: {
    enabled: true,
    allowAdditionalGuests: false,
    maxGuests: 1,
  },

  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },

  snapShare: {
    hashtag: "#KENtutinSiALLY",
  },

  faqs: [
    {
      question: "Can I bring a plus one?",
      answer:
        "This invitation is reserved for the guests named. Please RSVP with the number of seats indicated. If you have a special request, include it in your RSVP message.",
    },
    {
      question: "What should I wear?",
      answer:
        "Please see the Attire Guide. We kindly ask guests to dress in the recommended palette so the celebration feels cohesive in photographs.",
    },
    {
      question: "Where is the ceremony?",
      answer:
        "The ceremony will be held at the Parish of the Holy Family (placeholder venue). A map link is available in the Details section.",
    },
    {
      question: "Where is the reception?",
      answer:
        "The reception follows at Garden Pavilion at Luxe Estates (placeholder venue). Please allow time to travel between venues.",
    },
    {
      question: "Is parking available?",
      answer:
        "Limited parking is available at both venues. We encourage carpooling or ride-hailing when possible.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "Please arrive at least 20 minutes before the ceremony so you can be seated comfortably.",
    },
    {
      question: "Can I bring children?",
      answer:
        "We love your little ones, but this celebration is reserved for the adults named on the invitation unless otherwise noted.",
    },
    {
      question: "Where can I send a gift?",
      answer:
        "Your presence is the greatest gift. If you wish to send a token, please see the Gift Guide — accounts shown are placeholders for this demo.",
    },
    {
      question: "How do I RSVP?",
      answer:
        "Use the RSVP form on this invitation. Your response is saved to the couple’s Google Sheet through a private Apps Script endpoint.",
    },
  ],

  closingMessage: {
    signOff: "With love,",
    names: "Allyzza & Kenneth",
    body: "Thank you for being part of our story\nand for celebrating this beautiful beginning with us.",
    farewell: "We can't wait to see you!",
  },

  seo: {
    title: "Allyzza & Kenneth — Our Wedding",
    description:
      "Join Allyzza and Kenneth as they celebrate their wedding day on December 12, 2026.",
    ogImage: asset("hero.svg"),
  },
};
