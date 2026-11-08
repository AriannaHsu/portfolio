import koala from '../assets/basket/koala.webp'
import altea from '../assets/basket/spain.webp'

/**
 * Items on the Basket canvas (Figma 93:520).
 *
 * x / y place the card in one "world tile" (BASKET_WORLD, in px at desktop size); the tile repeats
 * forever in every direction, so the canvas never runs out. Keep cards inside the tile and leave
 * some breathing room between them.
 *
 * Add a project later by giving it `to: '/work/<slug>'`: the card becomes a link to the case study.
 */
export const BASKET_WORLD = { width: 1440, height: 1100 }

export const basketItems = [
  {
    id: 'koala',
    title: 'Koala',
    tag: 'Crochet',
    image: koala,
    alt: 'A crocheted grey koala with a white belly, sitting in front of a crocheted leafy branch.',
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
    imageWidth: 568,
    imageHeight: 320,
    x: 765,
    y: 412,
  },
]
