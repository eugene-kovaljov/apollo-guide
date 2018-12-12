export interface ContentTypeMock {
  key: string;
  icon: string;
  displayName: string;
}

export const contentType: ContentTypeMock = {
  key: 'video-course',
  icon: 'playCircle',
  displayName: 'Video Course'
};

export const contentTypes = [
  {
    key: 'video-course',
    icon: 'playCircle',
    displayName: 'Video Course'
  },
  {
    key: 'guide',
    icon: 'hand',
    displayName: 'Guides'
  },
  {
    key: 'course',
    icon: 'interactive',
    displayName: 'Interactive Course'
  },
  {
    key: 'project',
    icon: 'project',
    displayName: 'Project'
  },
  {
    key: 'assessment',
    icon: 'test',
    displayName: 'Skill Assessment'
  }
];
