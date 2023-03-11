import { DeleteOutlined } from '@ant-design/icons'
import { useStore } from '@libeilong/react-store-provider'
import { Button, Form, Space, Tooltip } from 'antd'
import { Icon } from '../../../components/icon'
import { withObserver } from '../../../shared/func/withObserver'
import { Storage } from '../../../shared/storage'
import { appStore } from '../../../stores/app'
import { Store } from '../store'
import styles from './index.module.scss'

const themes = [
  { label: '跟随系统', icon: 'computer-line', value: 'auto' as const },
  { label: '明亮模式', icon: 'sun-line', value: 'light' as const },
  { label: '夜间模式', icon: 'moon-line', value: 'dark' as const },
]

export function OtherSetting() {
  const root = useStore<Store>()
  const store = root.stores.other

  return withObserver(() => (
    <Form layout="vertical" className={styles.index}>
      <Form.Item label="主题" className={styles.theme}>
        <Space size={18}>
          {themes.map((it) => {
            return (
              <Tooltip title={it.label} key={it.value}>
                <span
                  className={styles.icon}
                  onClick={() => appStore.setTheme(it.value)}
                >
                  <Icon value={it.icon} />
                </span>
              </Tooltip>
            )
          })}
        </Space>
      </Form.Item>

      <Form.Item label="缓存">
        <span>
          {store.storage.convs.length} 个会话、{store.storage.msgs.length}{' '}
          条消息
        </span>
        <Button
          onClick={store.clearStorage}
          icon={<DeleteOutlined />}
          type="link"
        >
          清除缓存
        </Button>
      </Form.Item>
    </Form>
  ))
}

