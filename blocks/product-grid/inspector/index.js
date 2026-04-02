import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { settings, brush, cog } from '@wordpress/icons';

import General from './General';
import Style from './Style';
import Advanced from './Advanced';

const Inspector = (props) => {
    return (
        <InspectorControls>
            <TabPanel
                className="wooapb-tabs"
                activeClass="active-tab"
                tabs={[
                    {
                        name: 'general',
                        title: (
                            <span className="wooapb-tab-title">
                                <span className="tab-icon">{settings}</span>
                                <span>{__('General', 'wooapb')}</span>
                            </span>
                        ),
                    },
                    {
                        name: 'style',
                        title: (
                            <span className="wooapb-tab-title">
                                <span className="tab-icon">{brush}</span>
                                <span>{__('Style', 'wooapb')}</span>
                            </span>
                        ),
                    },
                    {
                        name: 'advanced',
                        title: (
                            <span className="wooapb-tab-title">
                                <span className="tab-icon">{cog}</span>
                                <span>{__('Advanced', 'wooapb')}</span>
                            </span>
                        ),
                    },
                ]}
            >
                {(tab) => {
                    if (tab.name === 'general') {
                        return <General {...props} />;
                    }
                    if (tab.name === 'style') {
                        return <Style {...props} />;
                    }
                    if (tab.name === 'advanced') {
                        return <Advanced {...props} />;
                    }
                    return null;
                }}
            </TabPanel>
        </InspectorControls>
    );
};

export default Inspector;
