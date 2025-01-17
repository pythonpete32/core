import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import {getContractAddress} from './helpers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const managingDAOAddress = await getContractAddress('DAO', hre);
  const pluginRepoRegistryAddress = await getContractAddress(
    'PluginRepoRegistry',
    hre
  );

  await deploy('PluginSetupProcessor', {
    from: deployer,
    args: [managingDAOAddress, pluginRepoRegistryAddress],
    log: true,
  });
};
export default func;
func.tags = ['PluginSetupProcessor'];
