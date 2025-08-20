'use client'; // Para client-side rendering

import React from 'react';

interface VlogEmbedProps {
  videoId: string; // ID de YouTube, ej. 'dQw4w9WgXcQ'
}

const VlogEmbed: React.FC<VlogEmbedProps> = ({ videoId }) => {
  return (
    <div className="aspect-video w-full max-w-2xl">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Vlog"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VlogEmbed;