import { publicUrl } from '../publicUrl'

export type EventKey = 'church' | 'home' | 'party'

export type InvitationEvent = {
  key: EventKey
  title: string
  dateText: string
  timeText: string
  lunarText?: string
  locationName?: string
  addressLines?: string[]
  googleMapsUrl?: string
  mapQueryForEmbed?: string
}

export type RsvpConfig =
  | {
      type: 'disabled'
    }
  | {
      /**
       * Lưu câu trả lời vào Google Sheet qua Apps Script (Web App).
       * Tạo Sheet → Tiện ích mở rộng → Apps Script → dán `google-apps-script/Code.gs` → Triển khai Web App
       * (quyền: Bất kỳ ai). Gán URL `/exec` vào `webAppUrl`.
       */
      type: 'googleSheet'
      webAppUrl: string
    }

export type InvitationContent = {
  locale: 'vi'
  couple: {
    brideName: string
    brideNote?: string
    groomName: string
    groomNote?: string
  }
  families: {
    brideParents: string[]
    groomParents: string[]
  }
  events: InvitationEvent[]
  rsvp: RsvpConfig
  story: {
    leftText: string
    rightText: string
  }
  gallery: {
    title: string
    images: { src: string; alt: string }[]
  }
}

export const invitationVi: InvitationContent = {
  locale: 'vi',
  couple: {
    brideName: 'Tống Phương Uyên',
    groomName: 'Lê Quang Sang',
  },
  families: {
    groomParents: ['Ông: Lê Quang Quân', 'Bà: Nguyễn Thị Ngọc Hoa'],
    brideParents: ['Ông: Tống Đức Dũng', 'Bà: Trần Thị Huy Trang'],
  },
  events: [
    {
      key: 'church',
      title: 'Tiệc nhà trai',
      dateText: 'Thứ bảy 07/11/2026',
      timeText: '11:00',
      lunarText: 'Nhằm 29/09 năm Bính Ngọ',
      locationName: 'Khu phố 3, phường Bình Cơ, TP.HCM',
      addressLines: [],
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Khu+ph%E1%BB%91+3,+ph%C6%B0%E1%BB%9Dng+B%C3%ACnh+C%C6%A1,+TP.HCM',
      mapQueryForEmbed: 'Khu phố 3, phường Bình Cơ, TP.HCM',
    },
    {
      key: 'home',
      title: 'Lễ tại tư gia',
      dateText: 'Thứ bảy, ngày 07/11/2026',
      timeText: '09:00',
      lunarText: 'Nhằm 29/09 năm Bính Ngọ',
    },
    {
      key: 'party',
      title: 'Tiệc nhà gái',
      dateText: 'Chủ nhật 01/11/2026',
      timeText: '11:00',
      locationName: 'Trung tâm văn hóa (cơ sở 2) Tân Uyên',
      addressLines: [
        'Trung tâm văn hóa xã Bạch Đằng Cũ',
        'Phường Tân Uyên, TP. Hồ Chí Minh',
        '(Tân Uyên, Bình Dương cũ)',
      ],
      googleMapsUrl: 'https://maps.app.goo.gl/9wFqH8SPTgcWYjWc7',
      mapQueryForEmbed:
        'Trung tâm văn hóa (cơ sở 2) Tân Uyên, Phường Tân Uyên, TP. Hồ Chí Minh',
    },
  ],
  rsvp: {
    type: 'googleSheet',
    webAppUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
  },
  story: {
    leftText: '',
    rightText: '',
  },
  gallery: {
    title: 'Hình cô dâu & chú rể',
    images: [
      { src: publicUrl('/gallery/01.webp'), alt: 'Uyên & Sang 01' },
      { src: publicUrl('/gallery/02.webp'), alt: 'Uyên & Sang 02' },
      { src: publicUrl('/gallery/03.webp'), alt: 'Uyên & Sang 03' },
      { src: publicUrl('/gallery/04.webp'), alt: 'Uyên & Sang 04' },
      { src: publicUrl('/gallery/05.webp'), alt: 'Uyên & Sang 05' },
      { src: publicUrl('/gallery/06.webp'), alt: 'Uyên & Sang 06' },
      { src: publicUrl('/gallery/07.webp'), alt: 'Uyên & Sang 07' },
      { src: publicUrl('/gallery/08.webp'), alt: 'Uyên & Sang 08' },
      { src: publicUrl('/gallery/09.webp'), alt: 'Uyên & Sang 09' },
      { src: publicUrl('/gallery/10.webp'), alt: 'Uyên & Sang 10' },
      { src: publicUrl('/gallery/11.webp'), alt: 'Uyên & Sang 11' },
      { src: publicUrl('/gallery/12.webp'), alt: 'Uyên & Sang 12' },
      { src: publicUrl('/gallery/13.webp'), alt: 'Uyên & Sang 13' },
      { src: publicUrl('/gallery/14.webp'), alt: 'Uyên & Sang 14' },
      { src: publicUrl('/gallery/15.webp'), alt: 'Uyên & Sang 15' },
      { src: publicUrl('/gallery/16.webp'), alt: 'Uyên & Sang 16' },
      { src: publicUrl('/gallery/17.webp'), alt: 'Uyên & Sang 17' },
      { src: publicUrl('/gallery/18.webp'), alt: 'Uyên & Sang 18' },
      { src: publicUrl('/gallery/19.webp'), alt: 'Uyên & Sang 19' },
      { src: publicUrl('/gallery/20.webp'), alt: 'Uyên & Sang 20' },
      { src: publicUrl('/gallery/21.webp'), alt: 'Uyên & Sang 21' },
      { src: publicUrl('/gallery/22.webp'), alt: 'Uyên & Sang 22' },
      { src: publicUrl('/gallery/23.webp'), alt: 'Uyên & Sang 23' },
      { src: publicUrl('/gallery/24.webp'), alt: 'Uyên & Sang 24' },
      { src: publicUrl('/gallery/25.webp'), alt: 'Uyên & Sang 25' },
    ],
  },
}

