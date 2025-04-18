/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useCallback, useEffect, MouseEvent } from 'react';

import { css, t, styled, useTheme } from '@superset-ui/core';
import { Tooltip } from 'src/components/Tooltip';
import { Icons } from 'src/components/Icons';

export interface FaveStarProps {
  itemId: number;
  isStarred?: boolean;
  showTooltip?: boolean;
  saveFaveStar(id: number, isStarred: boolean): any;
  fetchFaveStar?: (id: number) => void;
}

const StyledLink = styled.a`
  ${({ theme }) => css`
    font-size: ${theme.typography.sizes.xl}px;
    display: flex;
    padding: 0 0 0 ${theme.gridUnit * 2}px;
  `};
`;

const FaveStar = ({
  itemId,
  isStarred,
  showTooltip,
  saveFaveStar,
  fetchFaveStar,
}: FaveStarProps) => {
  const theme = useTheme();
  useEffect(() => {
    fetchFaveStar?.(itemId);
  }, [fetchFaveStar, itemId]);

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      saveFaveStar(itemId, !!isStarred);
    },
    [isStarred, itemId, saveFaveStar],
  );

  const content = (
    <StyledLink
      href="#"
      onClick={onClick}
      className="fave-unfave-icon"
      data-test="fave-unfave-icon"
      role="button"
    >
      {isStarred ? (
        <Icons.StarFilled
          aria-label="starred"
          iconSize="l"
          iconColor={theme.colors.warning.base}
        />
      ) : (
        <Icons.StarOutlined
          aria-label="unstarred"
          iconSize="l"
          iconColor={theme.colors.grayscale.light1}
        />
      )}
    </StyledLink>
  );

  if (showTooltip) {
    return (
      <Tooltip
        id="fave-unfave-tooltip"
        title={t('Click to favorite/unfavorite')}
      >
        {content}
      </Tooltip>
    );
  }

  return content;
};
export default FaveStar;
