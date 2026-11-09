import koala from '../assets/basket/koala.webp'
import altea from '../assets/basket/spain.webp'
import orchestra from '../assets/basket/orchestra.webp'

/**
 * Items on the Basket canvas (Figma 93:520).
 *
 * x / y place the card in one "world tile" (BASKET_WORLD, in px at desktop size); the tile repeats
 * forever in every direction, so the canvas never runs out. Keep cards inside the tile and leave
 * some breathing room between them.
 *
 * Add a project later by giving it `to: '/work/<slug>'`: the card becomes a link to the case study.
 *
 * `caption` is the line revealed under the title: a list of plain text and { text, href } links
 * (links open in a new tab).
 */
// Cards sit in separate columns (at least 140px apart), so opening one, which grows it downward by the
// title row and caption, can never run it into another card. Card padding and text don't shrink on
// phones the way positions do, so a smaller gap would overlap there first.
export const BASKET_WORLD = { width: 1880, height: 1100 }

export const basketItems = [
  {
    id: 'koala',
    title: 'Koala',
    tag: 'Crochet',
    image: koala,
    alt: 'A crocheted grey koala with a white belly sitting on a crocheted eucalyptus branch, with a crocheted eucalyptus.',
    caption: ['Made with ❤️ for mom (koala) and dad (eucalyptus)'],
    imageWidth: 400,
    imageHeight: 360,
    objectPosition: '47% 50%',
    x: 98,
    y: 186,
  },
  {
    id: 'altea',
    title: 'Altea, Spain',
    tag: 'Photography',
    image: altea,
    alt: 'Pink and blue sunset over a calm sea in Altea, Spain, with a rocky headland on the horizon.',
    caption: ['\"The heavens declare the glory of God, and the sky above proclaims his handiwork.\" - Psalm 19:1'],
    imageWidth: 568,
    imageHeight: 320,
    x: 765,
    y: 412,
  },
  {
    id: 'bassoon',
    title: 'Bassoon',
    tag: 'Music',
    image: orchestra,
    alt: 'Arianna playing the bassoon in an orchestra, seen from above, beside another bassoonist.',
    caption: ['Check out ', { text: 'Impromptu and Humoresque by Glière', href: 'https://youtu.be/nyWV3yF1a5g?si=hEQ0NusIvrwemgPZ' }, ' to hear the bassoon\'s diverse range!'],
    imageWidth: 340,
    imageHeight: 340,
    x: 1480, // right of Altea (which ends at 1333)
    y: 160,
  },
]
