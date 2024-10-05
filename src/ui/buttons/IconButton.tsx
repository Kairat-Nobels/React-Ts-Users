import React from 'react';
import { Button, Whisper, Tooltip } from 'rsuite';
import { IconType } from 'react-icons/lib';
import { useMediaQuery } from 'react-responsive';

interface IconButtonProps {
  onClick: () => void;
  icon?: IconType;
  title?: string;
  tooltip?: string;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon: Icon, title, tooltip, color }) => {
  const isMobile = useMediaQuery({ maxWidth: 560 });
  return (
    <Whisper trigger="hover" placement="top" speaker={<Tooltip>{tooltip}</Tooltip>}>
      <Button className="button" appearance="default" onClick={onClick}>
        {Icon && <Icon size={isMobile ? 24 : 20} color={color} />}
        {title && <span>{title}</span>}
      </Button>
    </Whisper>
  )
};

export default IconButton;
