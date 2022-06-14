import React, { ReactNode, useState } from 'react';
import { Form, FormInstance, Input } from 'antd';

interface YouTubeLinkFormPropType {
  form1: FormInstance<any>;
  youTubeLink: string;
  setVideoThumbnailURL: React.Dispatch<React.SetStateAction<string>>;
  setYouTubeLink: React.Dispatch<React.SetStateAction<string>>;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const YouTubeLinkForm = ({
  form1,
  youTubeLink,
  setVideoThumbnailURL,
  setYouTubeLink,
  setShowDialog,
}: YouTubeLinkFormPropType) => {
  return (
    <Form name="youTubeLink" form={form1}>
      <Form.Item name="youtubeUrl" style={{ width: 'auto' }}>
        <Input
          allowClear
          value={youTubeLink}
          addonBefore={'Youtube Link'}
          placeholder={'Add Youtube Link'}
          size="large"
          onChange={(e) => {
            const youtubeThumbnail1 = e.target.value
              .split('v=')[1]
              .substring(0, 11);
            const youtubeImage = `https://img.youtube.com/vi/${youtubeThumbnail1}/hqdefault.jpg`;
            setVideoThumbnailURL(youtubeImage);
            setYouTubeLink(e.target.value);
            setShowDialog(true);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default YouTubeLinkForm;
