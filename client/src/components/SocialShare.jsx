import React from 'react'
import { RxCopy } from "react-icons/rx";
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
  


const SocialShare = ({url, title}) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard');
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
    };

  return (
    <div className='fixed inset-0 z-50'>
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className="flex items-center justify-center space-x-3 p-4 bg-white h-[10vh] rounded-xl opacity-90">
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
                </div>
        </div>
    </div>
  )
}

export default SocialShare