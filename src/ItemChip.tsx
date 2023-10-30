import { Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { createRef, useEffect, useState } from 'react';
import * as React from 'react';
import styles from './ItemChip.scss';
import { theme } from './theme';

interface IItem {
    enabled: boolean;
    label: string;
    editing?: boolean;
}

interface IComponentProps {
    item: IItem;
    onDelete(item: string): void;
    onUpdate(oldItem: IItem, newItem: IItem): void;
}

const ItemChip = ({ item, onDelete, onUpdate }: IComponentProps) => {
    const [ editing, setEditing ] = useState(item.editing);

    const inputRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
            const range = document.createRange();
            range.selectNodeContents(inputRef.current);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            // inputRef.current.setSelectionRange(0, inputRef.current.value.length);
        }
    }, [ editing ]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            setEditing(false);
            e.currentTarget.innerText = item.label;
        }

        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            setEditing(false);
            onUpdate(item, { enabled: item.enabled, label: e.currentTarget.innerText });
        }
    }

    const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setEditing(false);
        onUpdate(item, { enabled: item.enabled, label: e.currentTarget.innerText });
    }

    const toggleDisabled = () => onUpdate(item, { ...item, enabled: !item.enabled });

    const onEditClicked = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        setEditing(true);
    }

    const labelDiv = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <div className={styles.input} ref={inputRef} contentEditable={editing} onKeyDown={onKeyDown} onBlur={onBlur}>
                {item.label}
            </div>
            <EditIcon className={styles.icon} fontSize="small" color={(item.enabled ? theme.palette.primary.contrastText : 'disabled') as unknown as any} onClick={onEditClicked} />
        </div>
    );

    return (
        <Chip label={labelDiv} color={item.enabled ? 'primary' : 'default'} onDelete={() => onDelete(item.label)}
              onClick={toggleDisabled}
              icon={item.enabled && <CheckIcon fontSize="small" color={theme.palette.primary.contrastText as unknown as any} />} />
    );
}

export default ItemChip;
