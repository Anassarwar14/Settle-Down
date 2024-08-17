import React, { useState } from 'react'
import { RxCopy } from "react-icons/rx";
import { TbCopyCheckFilled } from "react-icons/tb";
import {
    FacebookShareButton,
    TwitterShareButton,
    XIcon,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon
  } from 'react-share';
  


const SocialShare = ({url, title, isClipBoard}) => {
    const [linkCoppied, setLinkCoppied] = useState(false);

    const copyToClipboard =  () => {
      navigator.clipboard.writeText(url).then(() => {
        setLinkCoppied(true);
        isClipBoard(true);
        setTimeout(() => isClipBoard(false), 1000)
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    };

  return (
    <div className='fixed inset-0 z-50'>
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className="flex items-center justify-center flex-wrap space-x-3 p-4 bg-white w-60 h-auto rounded-xl opacity-90">
                <FacebookShareButton url={url} quote={title} className="hover:opacity-75">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title} className="hover:opacity-75">
                    <XIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={url} title={title} className="hover:opacity-75">
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={url} title={title} className="hover:opacity-75">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <button onClick={copyToClipboard} className="hover:opacity-75 transition-opacity duration-300">
                    <RxCopy size={25} className="text-gray-700" />
                </button>
                {linkCoppied && <p className='text-green-600 flex items-center gap-1 text-sm whitespace-nowrap mt-2'><TbCopyCheckFilled className='text-lg' />Link copied to the clipboard!</p>}
            </div>
        </div>
    </div>
  )
}

export default SocialShare