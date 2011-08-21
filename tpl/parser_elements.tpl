{if $element.type == 'my_elem_title_small'}
				<td class="td_2" colspan="2" align="{$element.elem_align}">
						{if $element.elem_h}<{$element.elem_h}>{/if}			    		
			    		{if $element.elem_bold}<b>{/if}			    		
			    		{if $element.elem_italic}<i>{/if}
			    		
			    		<div id="{$element.elem_id}" {if $element.elem_class}class="{$element.elem_class}"{/if}>
							{$element.elem_title}{if $element.elem_required}<span class="form_elem_required">*</span>{/if}
			    		</div>
			    		
			    		{if $element.elem_italic}</i>{/if}
			    		{if $element.elem_bold}</b>{/if}			    		
			    		{if $element.elem_h}</{$element.elem_h}>{/if}
				</td>
{elseif $element.type == 'my_elem_hr'}
				<td class="td_2" colspan="2">
					<hr id="{$element.elem_id}" {if $element.elem_class}class="{$element.elem_class}"{/if}/>
				</td>
{elseif $element.type == 'my_elem_text'}
				<td class="td_1">
			    		{$element.elem_title}{if $element.elem_required}<span class="form_elem_required">*</span>{/if}
				</td>
				<td class="td_2">
					<input type="text" id="{$element.elem_id}" name="{$element.elem_name}" {if $element.elem_class}class="{$element.elem_class}"{/if} {if $element.elem_maxlength}maxlength="{$element.elem_maxlength}"{/if}/>
				</td>
{elseif $element.type == 'my_elem_textarea'}
				<td class="td_1">
			    		{$element.elem_title}{if $element.elem_required}<span class="form_elem_required">*</span>{/if}
				</td>
				<td class="td_2">
					<textarea id="{$element.elem_id}" name="{$element.elem_name}" {if $element.elem_class}class="{$element.elem_class}"{/if} {if $element.elem_maxlength}maxlength="{$element.elem_maxlength}"{/if}></textarea>
				</td>
{elseif $element.type == 'my_elem_file'}
				<td class="td_1">
			    		{$element.elem_title}{if $element.elem_required}<span class="form_elem_required">*</span>{/if}
				</td>
				<td class="td_2">
					<input type="file" id="{$element.elem_id}" name="{$element.elem_name}" {if $element.elem_class}class="{$element.elem_class}"{/if} />
				</td>
{elseif $element.type == 'my_elem_select'}
				<td class="td_1">
			    		{$element.elem_title}{if $element.elem_required}<span class="form_elem_required">*</span>{/if}
				</td>
				<td class="td_2">
					<select id="{$element.elem_id}" name="{$element.elem_name}" {if $element.elem_class}class="{$element.elem_class}"{/if} >
						{foreach from=$element.select_options item=item}
							<option value="{$item->val}" {if $item->val == $element.select_default}selected=selected{/if}>{$item->text}</option>
						{/foreach}
					</select>
				</td>
{else} 
	<td>{$element.type}</td>
{/if}