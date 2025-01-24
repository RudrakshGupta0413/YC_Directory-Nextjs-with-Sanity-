import { formatDate } from '@/lib/utils'
// import { EyeIcon, Link as RouterLink } from 'lucide-react'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupCardType = Omit<Startup, "author"> & {author?: Author};


const StartupCard = ({ post }: { post: StartupCardType }) => {
    const {
        _createdAt = new Date().toISOString(), // Ensure a fallback value
        views, 
        author, // Default for author
        title,
        category,
        _id,
        description,
        image, 
    } = post

    console.log("Post data:", post)
    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup_card_date'>
                    {formatDate(_createdAt)}
                </p>

                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>

            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`} suppressHydrationWarning={true}>
                        <h2 className='text-16-medium line-clamp-1'>{author?.name}</h2>
                    </Link>
                    <Link href={`/startup/${_id}`} suppressHydrationWarning={true}>
                        <p className='text-3xl font-bold line-clamp-2'>{title}</p>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src="https://placehold.co/48x48" alt='placeholder' width={48} height={48} className='rounded-full' />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>
                    {description}
                </p>

                <img src={image} alt='placeholder' className='startup-card_img' />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard