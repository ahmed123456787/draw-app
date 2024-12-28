let children = [
  {
    profileImg:
      "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    childName: "Michael Brown",
    lastEdit: "2024-12-01T08:30:00Z",
  },
  {
    profileImg:
      "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    childName: "Sarah Wilson",
    lastEdit: "2024-12-02T10:00:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Michael Brown",
    lastEdit: "2024-12-03T14:15:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Olivia Harris",
    lastEdit: "2024-12-04T09:45:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Noah Clark",
    lastEdit: "2024-12-05T11:30:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Michael Brown",
    lastEdit: "2024-12-06T16:00:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Liam Thompson",
    lastEdit: "2024-12-07T08:45:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Sarah Wilson",
    lastEdit: "2024-12-08T12:30:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Michael Brown",
    lastEdit: "2024-12-09T15:45:00Z",
  },
  {
    profileImg:
      "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    childName: "Sarah Wilson",
    lastEdit: "2024-12-10T18:00:00Z",
  },
  {
    profileImg:
      "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    childName: "Liam Thompson",
    lastEdit: "2024-12-11T13:30:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Noah Clark",
    lastEdit: "2024-12-12T09:15:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Olivia Harris",
    lastEdit: "2024-12-13T11:00:00Z",
  },
  {
    profileImg:
      "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp",
    childName: "Liam Thompson",
    lastEdit: "2024-12-14T17:45:00Z",
  },
  {
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s",
    childName: "Olivia Harris",
    lastEdit: "2024-12-15T14:30:00Z",
  },
];

// Add unique ID to each child
children = children.map((child, index) => ({
  ...child,
  id: index + 1, // Unique ID starting from 1
}));



export default children;

