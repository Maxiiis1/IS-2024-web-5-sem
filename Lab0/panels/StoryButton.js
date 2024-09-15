import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Button } from '@vkontakte/vkui';

const StoryButton = () => {
  const [loading, setLoading] = useState(false);

  const openStoryEditor = async () => {
    setLoading(true);

    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    
    const image = data.message;

    bridge.send("VKWebAppShowStoryBox", {
      "background_type": "image",
      "url": image,
      "locked": true
    });

    setLoading(false);
  };

  return (
    <div>
      <Button size="l" stretched onClick={openStoryEditor} disabled={loading}>
        {loading ? 'Загрузка страницы' : 'Открыть редактор историй'}
      </Button>
    </div>
  );
};

export default StoryButton;
