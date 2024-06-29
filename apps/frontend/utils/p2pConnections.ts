import {PermissionsAndroid, Rationale} from 'react-native';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  sendFile,
  receiveFile,
  getConnectionInfo,
  getGroupInfo,
  receiveMessage,
  sendMessage,
} from 'react-native-wifi-p2p';

export default class P2PConnection {
  private static instance_: P2PConnection | undefined;
  public static instance() {
    if (!this.instance_) {
      this.instance_ = new P2PConnection();
    }
    return this.instance_;
  }

  private isInitialized;
  private startedPeerDiscovery;

  public constructor() {
    this.isInitialized = false;
    this.startedPeerDiscovery = false;
  }

  public init = async () => {
    if (this.isInitialized) {
      return;
    }
    try {
      await initialize().then(() => {
        console.log('WifiP2P initialized');

        this.isInitialized = true;
      });
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Access to wi-fi P2P mode',
          message: 'ACCESS_COARSE_LOCATION',
        } as Rationale,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access to wi-fi P2P mode',
          message: 'ACCESS_FINE_LOCATION',
        } as Rationale,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
        {
          title: 'Access to wi-fi P2P mode',
          message: 'NEARBY_WIFI_DEVICES',
        } as Rationale,
      );
      
    } catch (e) {
      console.error(e);
    }
  };

  public startPeerDiscovery = async () => {
    if (!this.isInitialized) {
      console.error('WifiP2P not initialized');
      return;
    }
    if (this.startedPeerDiscovery) {
      return;
    }
    try {
      await startDiscoveringPeers().then(() => {
        this.startedPeerDiscovery = true;
        console.log('Peer discovery started');
      });
    } catch (e) {
      console.log(e);
    }
  };

  public getAvailablePeers = async () => {
    if (!this.isInitialized) {
      console.error('WifiP2P not initialized');
      return;
    }
    if (!this.startedPeerDiscovery) {
      console.error('Peer discovery not started');
      return;
    }
    try {
      const peers = await getAvailablePeers();
      console.log('Available peers', peers);
      return peers;
    } catch (e) {
      console.error(e);
    }
  };
}
