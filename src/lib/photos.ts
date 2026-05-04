import type { ImageMetadata } from 'astro'
import type { PhotoData, Photo, PolaroidVariant } from '~/types'

// Auto-import all images under the photos directory.
const photoModules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/**/*.{webp,jpg,jpeg,png}', { eager: true })

/**
 * Get a sorted list of photos by directory name.
 * @param dir - Directory name, for example '2025-06-21-cat'
 * @param alt - Image alt text
 * @param variants - Variant for each image, mapped by index
 */
function getPhotos(dir: string, alt: string, variants: PolaroidVariant[]): Photo[] {
  return Object.entries(photoModules)
    .filter(([path]) => path.includes(`/${dir}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod], index) => {
      const img = mod.default
      return {
        src: img,
        alt,
        width: img.width,
        height: img.height,
        variant: variants[index] || '4x3',
      }
    })
}

export const PhotosList: PhotoData[] = [
  {
    title: '钱多多到家第一天',
    icon: { type: 'emoji', value: '🐾' },
    description: '晚上十点半，小家伙第一次踏进家门。',
    date: '2025-07-05',
    travel: '',
    photos: getPhotos('2025-07-05-firstday', '钱多多到家第一天', ['4x3']),
  },
]
