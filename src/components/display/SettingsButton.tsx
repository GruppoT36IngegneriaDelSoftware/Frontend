import { useEffect, useState } from 'react';

import SettingsIcon from '@/icons/SettingsIcon';

import NewPopup from './NewPopup';

const SettingsButton = () => {
  const [viewPopup, setViewPopup] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!viewPopup) setOpened(false);
  }, [viewPopup]);

  const handleBlur = () => {
    if (!viewPopup) setViewPopup(true);
  };

  const handleClick = () => {
    setOpened(!opened);
  };

  return (
    <div
      className="max-h-5 place-content-center relative flex justify-end fill-additional-information"
      // chiudo il menu se perde il focus
      tabIndex={9}
      onBlur={handleBlur}
    >
      <div onClick={handleClick}>
        <SettingsIcon />
      </div>
      {opened && <NewPopup setViewPopup={setViewPopup} />}
    </div>
  );
};

export default SettingsButton;
